import { supabase } from "../lib/supabase/client";
import type { UserBookWithWordCount, BookSummary } from "../types/database";

// 유저 단어장 목록을 가져오기
export const getUserBookList = async (
  userId: string
): Promise<BookSummary[]> => {
  const { data, error } = await supabase
    .from("user_books")
    .select(
      `
      books(*,
        book_words(count)
      )
    `
    )
    .eq("user_id", userId)
    .order("selected_at", { ascending: false })
    .overrideTypes<Array<UserBookWithWordCount>, { merge: false }>();
  if (error) {
    throw new Error(
      `사용자 단어장을 가져오는데 실패했습니다: ${error.message}`
    );
  }

  return data.map((item) => ({
    ...item.books,
    word_count: item.books.book_words?.[0]?.count || 0,
  }));
};

// 유저 학습 진행상황 업데이트
export const upsertUserProgress = async ({
  userId,
  bookId,
  wordId,
  isCorrect,
}: {
  userId: string;
  bookId: string;
  wordId: string;
  isCorrect: boolean;
}) => {
  const now = new Date().toISOString();

  const { data, error } = await supabase.from("user_progress").upsert(
    [
      {
        user_id: userId,
        book_id: bookId,
        word_id: wordId,
        last_seen_at: now,
        wrong_count: isCorrect ? 0 : 1,
      },
    ],
    { onConflict: "user_id,book_id,word_id" }
  );

  if (error) {
    throw new Error(`학습 기록 저장 실패: ${error.message}`);
  }

  // 틀렸다면 wrong_count += 1 로 업데이트
  if (!isCorrect) {
    await supabase.rpc("increment_wrong_count", {
      user_id_input: userId,
      book_id_input: bookId,
      word_id_input: wordId,
    });
  }

  return data;
};

// 복습할 단어 조회
export const getWordListToReview = async (userId: string, bookId: string) => {
  const { data, error } = await supabase
    .from("user_progress")
    .select("word_id, wrong_count, last_seen_at")
    .eq("user_id", userId)
    .eq("book_id", bookId)
    .gt("wrong_count", 0)
    .order("wrong_count", { ascending: false });

  if (error) {
    throw new Error(`복습 단어 조회 실패: ${error.message}`);
  }

  return data;
};
