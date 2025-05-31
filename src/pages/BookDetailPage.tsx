import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { getBookWithWordList } from "../api/book";
import type { Entity } from "@/types/database";

export const BookDetailPage: React.FC = () => {
  const { bookId } = useParams();
  const navigation = useNavigate();

  const [book, setBook] = useState<Entity.BookWithWordList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [studyMode, setStudyMode] = useState<"list" | "card">("list");

  useEffect(() => {
    if (bookId) loadBook(bookId);
  }, [bookId]);

  const loadBook = async (id: string) => {
    try {
      setLoading(true);
      const data = await getBookWithWordList(id);
      setBook(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "단어장을 불러오는데 실패했습니다"
      );
    } finally {
      setLoading(false);
    }
  };

  const nextWord = () => {
    if (book && currentWordIndex < book.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const prevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const handleBack = () => navigation(-1);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-500">단어장을 불러오는 중...</div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64">
        <div className="text-red-500 mb-4">
          {error || "단어장을 찾을 수 없습니다"}
        </div>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          돌아가기
        </button>
      </div>
    );
  }

  const currentWord = book.words[currentWordIndex];

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <span className="mr-2">←</span>
            돌아가기
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStudyMode("list")}
              className={`px-3 py-1 rounded ${
                studyMode === "list"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              목록
            </button>
            <button
              onClick={() => setStudyMode("card")}
              className={`px-3 py-1 rounded ${
                studyMode === "card"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              카드
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h1>
        {book.description && (
          <p className="text-gray-600 mb-2">{book.description}</p>
        )}
        <p className="text-sm text-gray-500">총 {book.words.length}개 단어</p>
      </div>

      {/* 내용 */}
      {studyMode === "card" ? (
        // 카드 모드
        <div className="flex flex-col items-center">
          {currentWord && <WordCard word={currentWord} />}

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={prevWord}
              disabled={currentWordIndex === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
            >
              이전
            </button>

            <span className="text-gray-600">
              {currentWordIndex + 1} / {book.words.length}
            </span>

            <button
              onClick={nextWord}
              disabled={currentWordIndex === book.words.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              다음
            </button>
          </div>
        </div>
      ) : (
        // 목록 모드
        <div className="space-y-4">
          {book.words.map((word, index) => (
            <div
              key={word.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {word.text}
                  </h3>
                  {word.phonetic && (
                    <p className="text-sm text-gray-500">[{word.phonetic}]</p>
                  )}
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  {index + 1}
                </span>
              </div>

              <div className="space-y-2">
                {word.definitions.map((definition) => (
                  <div
                    key={definition.id}
                    className="border-l-2 border-blue-200 pl-3"
                  >
                    <div className="flex items-start gap-2 mb-1">
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {definition.part_of_speech}
                      </span>
                      <p className="text-sm text-gray-900 flex-1">
                        {definition.definition}
                      </p>
                    </div>
                    {definition.example_sentence && (
                      <p className="text-xs text-gray-600 italic ml-2">
                        예: {definition.example_sentence}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface WordCardProps {
  word: Entity.WordWithDefinitionList;
  showAnswer?: boolean;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  showAnswer = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(showAnswer);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`
            relative w-full h-64 cursor-pointer transition-transform duration-300
            ${isFlipped ? "transform rotateY-180" : ""}
          `}
        onClick={toggleFlip}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 앞면 - 단어 */}
        <div
          className={`
              absolute inset-0 w-full h-full backface-hidden
              bg-white border-2 border-gray-200 rounded-xl shadow-lg
              flex flex-col justify-center items-center p-6
              ${isFlipped ? "opacity-0" : "opacity-100"}
            `}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            {word.text}
          </h2>
          {word.phonetic && (
            <p className="text-lg text-gray-500 mb-4">[{word.phonetic}]</p>
          )}
          <p className="text-sm text-gray-400 text-center">
            카드를 클릭해서 뜻을 확인하세요
          </p>
        </div>

        {/* 뒷면 - 의미들 */}
        <div
          className={`
              absolute inset-0 w-full h-full backface-hidden
              bg-blue-50 border-2 border-blue-200 rounded-xl shadow-lg
              p-6 overflow-y-auto
              ${isFlipped ? "opacity-100" : "opacity-0"}
            `}
          style={{ transform: "rotateY(180deg)" }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            {word.text}
          </h3>

          <div className="space-y-3">
            {word.definitions.map((definition) => (
              <div
                key={definition.id}
                className="border-b border-blue-200 pb-2"
              >
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {definition.part_of_speech}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {definition.definition}
                    </p>
                    {definition.example_sentence && (
                      <p className="text-xs text-gray-600 italic">
                        예: {definition.example_sentence}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            다시 클릭해서 단어로 돌아가기
          </p>
        </div>
      </div>
    </div>
  );
};
