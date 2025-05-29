import { useEffect, useState } from "react";
import {
  getUserBookList,
  upsertUserProgress,
  getWordListToReview,
} from "../api/user";
import type { BookSummary } from "../types/database";

const MOCK_USER_ID = "00000000-0000-4000-8000-000000000001"; // 실제 존재하는 사용자 UUID로 대체
const MOCK_BOOK_ID = "10000000-0000-4000-8000-000000000001"; // 테스트용 단어장 UUID
const MOCK_WORD_ID = "20000000-0000-4000-8000-000000000004"; // 테스트용 단어 UUID

export default function TestPage() {
  const [books, setBooks] = useState<BookSummary[]>([]);
  const [reviewWords, setReviewWords] = useState<
    { word_id: string; wrong_count: number; last_seen_at: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const loadBooks = async () => {
    try {
      const result = await getUserBookList(MOCK_USER_ID);
      setBooks(result);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpsertProgress = async (isCorrect: boolean) => {
    try {
      setLoading(true);
      await upsertUserProgress({
        userId: MOCK_USER_ID,
        bookId: MOCK_BOOK_ID,
        wordId: MOCK_WORD_ID,
        isCorrect,
      });
      alert(`Progress ${isCorrect ? "correct" : "wrong"} 저장됨`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadReviewWords = async () => {
    try {
      const words = await getWordListToReview(MOCK_USER_ID, MOCK_BOOK_ID);
      setReviewWords(words);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📚 유저 단어장 목록</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} ({book.word_count} 단어)
          </li>
        ))}
      </ul>

      <hr />

      <h2>📌 학습 기록 테스트</h2>
      <button disabled={loading} onClick={() => handleUpsertProgress(true)}>
        ✅ 맞춤 (Progress 기록)
      </button>
      <button disabled={loading} onClick={() => handleUpsertProgress(false)}>
        ❌ 틀림 (Wrong Count 증가)
      </button>

      <hr />

      <h2>🔁 복습할 단어 보기</h2>
      <button onClick={loadReviewWords}>복습 단어 로드</button>
      <ul>
        {reviewWords.map((word) => (
          <li key={word.word_id}>
            Word ID: {word.word_id}, 틀린횟수: {word.wrong_count}, 최근학습:{" "}
            {new Date(word.last_seen_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
