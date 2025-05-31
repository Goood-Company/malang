import {
  DUMMY_QUESTION_LIST,
  DUMMY_WORD_LIST,
  type DUMMY_QUESTION_TYPE,
  type DUMMY_WORD_TYPE,
} from "@/dummy-data";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function StudyPage2() {
  const [currentPhase, setCurrentPhase] = useState(3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [shortAnswerInput, setShortAnswerInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    {
      question: DUMMY_QUESTION_TYPE;
      word: DUMMY_WORD_TYPE;
      userAnswer: string;
      isCorrect: boolean;
    }[]
  >([]);

  const navigate = useNavigate();

  const currentQuestion = DUMMY_QUESTION_LIST[currentQuestionIndex];
  const currentWord = DUMMY_WORD_LIST.find(
    (word) => word.id === currentQuestion.word_id
  );

  // 객관식/주관식 구분
  const isMultipleChoice = currentQuestion.type.includes("_choice");
  const isShortAnswer = currentQuestion.type.includes("_blank");

  const handleAnswerSubmit = () => {
    if (showFeedback) return;

    const userAnswer = isShortAnswer ? shortAnswerInput.trim() : selectedAnswer;
    const correctAnswer = currentQuestion.answer.trim();

    // 정답 비교 (대소문자 무시, 공백 제거)
    const isCorrect =
      userAnswer.toLowerCase().replace(/\s+/g, " ") ===
      correctAnswer.toLowerCase().replace(/\s+/g, " ");

    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }

    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: currentQuestion,
        word: currentWord!,
        userAnswer,
        isCorrect,
      },
    ]);

    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < DUMMY_QUESTION_LIST.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setShortAnswerInput("");
      setShowFeedback(false);
    } else {
      setCurrentPhase(4);
    }
  };

  const handleRestart = () => {
    navigate("/");
  };

  // 현재 사용자 답안이 정답인지 확인
  const getCurrentUserAnswer = () => {
    return isShortAnswer ? shortAnswerInput.trim() : selectedAnswer;
  };

  const isCurrentAnswerCorrect = () => {
    const userAnswer = getCurrentUserAnswer();
    const correctAnswer = currentQuestion.answer.trim();
    return (
      userAnswer.toLowerCase().replace(/\s+/g, " ") ===
      correctAnswer.toLowerCase().replace(/\s+/g, " ")
    );
  };

  if (currentPhase === 3) {
    return (
      <div className="max-w-md mx-auto p-6 flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">테스트 페이즈</h1>
          <div className="text-lg text-gray-600">
            {currentQuestionIndex + 1} / {DUMMY_QUESTION_LIST.length}
          </div>
        </div>

        <div className="flex-1">
          {/* 단어 표시 카드 */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 text-center">
            <div className="text-lg text-gray-600 mb-4">
              {currentQuestion.prompt}
            </div>
            {currentWord && (
              <div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {currentWord.text}
                </div>
                {currentWord.phonetic && (
                  <div className="text-sm text-gray-500 mb-2">
                    {currentWord.phonetic}
                  </div>
                )}
                {currentWord.example_sentence && (
                  <div className="text-sm text-gray-600 italic mt-3 p-3 bg-gray-50 rounded">
                    "{currentWord.example_sentence}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 객관식 */}
          {isMultipleChoice && currentQuestion.choices && (
            <div className="space-y-3">
              {currentQuestion.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!showFeedback) {
                      setSelectedAnswer(choice);
                    }
                  }}
                  disabled={showFeedback}
                  className={`w-full p-4 text-left border-2 rounded-lg font-medium transition-colors ${
                    showFeedback
                      ? choice === currentQuestion.answer
                        ? "bg-green-100 border-green-500 text-green-700"
                        : choice === selectedAnswer && !isCurrentAnswerCorrect()
                        ? "bg-red-100 border-red-500 text-red-700"
                        : "bg-gray-100 border-gray-300 text-gray-500"
                      : selectedAnswer === choice
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  {choice}
                </button>
              ))}

              {/* 객관식 제출 버튼 */}
              {!showFeedback && selectedAnswer && (
                <button
                  onClick={handleAnswerSubmit}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium mt-4"
                >
                  제출
                </button>
              )}
            </div>
          )}

          {/* 주관식 */}
          {isShortAnswer && (
            <div className="space-y-4">
              <input
                type="text"
                value={shortAnswerInput}
                onChange={(e) => setShortAnswerInput(e.target.value)}
                disabled={showFeedback}
                className={`w-full border-2 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  showFeedback
                    ? isCurrentAnswerCorrect()
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="정답을 입력하세요"
                onKeyPress={(e) => {
                  if (
                    e.key === "Enter" &&
                    !showFeedback &&
                    shortAnswerInput.trim() !== ""
                  ) {
                    handleAnswerSubmit();
                  }
                }}
              />
              <button
                onClick={handleAnswerSubmit}
                disabled={showFeedback || shortAnswerInput.trim() === ""}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium"
              >
                제출
              </button>
            </div>
          )}

          {/* 피드백 섹션 */}
          {showFeedback && (
            <div className="mt-6">
              <div className="text-center mb-4">
                <div
                  className={`text-lg font-bold mb-2 ${
                    isCurrentAnswerCorrect() ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isCurrentAnswerCorrect() ? "정답!" : "틀렸습니다"}
                </div>

                {!isCurrentAnswerCorrect() && (
                  <div className="text-gray-700">
                    <span className="font-medium">정답: </span>
                    <span className="text-green-600 font-bold">
                      {currentQuestion.answer}
                    </span>
                  </div>
                )}
              </div>

              {/* 설명 표시 */}
              {currentQuestion.explanation && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                  <div className="text-sm text-blue-800">
                    <strong>설명:</strong> {currentQuestion.explanation}
                  </div>
                </div>
              )}

              <button
                onClick={handleNextQuestion}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium"
              >
                {currentQuestionIndex === DUMMY_QUESTION_LIST.length - 1
                  ? "결과 보기"
                  : "다음 문제"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentPhase === 4) {
    const accuracy = Math.round(
      (correctCount / DUMMY_QUESTION_LIST.length) * 100
    );

    return (
      <div className="max-w-md mx-auto p-6 flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">학습 완료!</h1>
        </div>

        <div className="flex-1">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {correctCount} / {DUMMY_QUESTION_LIST.length}
            </div>
            <div className="text-xl text-gray-600 mb-4">
              정답률: {accuracy}%
            </div>

            <div
              className={`text-lg font-medium ${
                accuracy >= 80
                  ? "text-green-600"
                  : accuracy >= 60
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {accuracy >= 80
                ? "훌륭합니다!"
                : accuracy >= 60
                ? "좋습니다!"
                : "더 연습해보세요!"}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-gray-800 mb-3">틀린 문제</h3>
            {answeredQuestions.filter((q) => !q.isCorrect).length === 0 ? (
              <div className="text-gray-600">모든 문제를 맞혔습니다!</div>
            ) : (
              <div className="space-y-3">
                {answeredQuestions
                  .filter((q) => !q.isCorrect)
                  .map((q, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded border text-sm"
                    >
                      <div className="font-medium text-gray-800 mb-1">
                        {q.word.text} ({q.word.definition_kor})
                      </div>
                      <div className="text-gray-600 mb-1">
                        문제: {q.question.prompt}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600">
                          정답: {q.question.answer}
                        </span>
                        <span className="text-red-500">
                          입력: {q.userAnswer || "(없음)"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium w-full"
        >
          학습 완료
        </button>
      </div>
    );
  }

  return null;
}
