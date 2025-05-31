import { ComposedEntity } from "@/types/database";
import { supabase } from "../lib/supabase/client";

import { customQuery } from "./base";

// 전체 단어장 리스트 가져오기
export const fetchAllBookList = async (): Promise<
  ComposedEntity.BookSummary[]
> => {
  const { data, error } = await customQuery<ComposedEntity.BookWithWordCount[]>(
    (db) =>
      db
        .from("books")
        .select(
          `
        *,
        book_words(count)
      `
        )
        .eq("is_public", true)
        .order("created_at", { ascending: false })
  );

  if (error) {
    throw new Error(`단어장 목록을 가져오는데 실패했습니다: ${error.message}`);
  }

  if (!data) return [];

  return data.map((book) => ({
    ...book,
    word_count: book.book_words?.[0]?.count || 0,
  }));
};

// param : 단어장id
// 단어장 및 그 단어들을 한번에 가져오기
export const getBookWithWordList = async (
  bookId: string
): Promise<ComposedEntity.BookWithWordList | null> => {
  // 먼저 단어장 정보를 가져옵니다
  const { data: bookData, error: bookError } = await supabase
    .from("books")
    .select("*")
    .eq("id", bookId)
    .single();

  if (bookError || !bookData) {
    throw new Error(`단어장을 찾을 수 없습니다: ${bookError?.message}`);
  }

  // 단어장에 포함된 단어들과 의미를 가져옵니다
  const { data: wordsData, error: wordsError } = await supabase
    .from("book_words")
    .select(
      `
        words(*,
          definitions(*)
        )
      `
    )
    .eq("book_id", bookId)
    .order("order", { ascending: true })
    .overrideTypes<
      Array<{ words: ComposedEntity.WordWithDefinitionList }>,
      { merge: false }
    >();

  if (wordsError) {
    throw new Error(`단어를 가져오는데 실패했습니다: ${wordsError.message}`);
  }

  const wordsWithDefinitions: ComposedEntity.WordWithDefinitionList[] =
    wordsData.map((item) => ({
      ...item.words,
      definitions: item.words.definitions.sort((a, b) => a.order - b.order),
    }));

  return {
    ...bookData,
    words: wordsWithDefinitions,
  };
};

// param : 검색어
// 단어장 검색
export const searchBooks = async (
  query: string
): Promise<ComposedEntity.BookSummary[]> => {
  const { data, error } = await supabase
    .from("books")
    .select(
      `
        *,
        book_words(count)
      `
    )
    .eq("is_public", true)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`단어장 검색에 실패했습니다: ${error.message}`);
  }

  return data.map((book) => ({
    ...book,
    word_count: book.book_words?.[0]?.count || 0,
  }));
};
