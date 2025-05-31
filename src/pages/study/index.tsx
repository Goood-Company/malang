import { DUMMY_QUESTION_LIST, DUMMY_WORD_LIST } from "@/dummy-data";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function StudyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    {
      question: {
        id: string;
        word_id: string;
        type: string;
        prompt: string;
        choices: string[];
        answer: string;
        word: string;
      };
      userAnswer: string;
      isCorrect: boolean;
    }[]
  >([]);

  const navigate = useNavigate();

  const fetchFn = async () => {
    try {
      setIsLoading(true);
      // 실제 API 호출 로직
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFn();
  }, []);

  // 1페이즈: 카드 넘기기
  const handleCardNavigation = (direction: "next" | "prev") => {
    if (direction === "next") {
      if (currentCardIndex < DUMMY_WORD_LIST.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        // 마지막 카드면 2페이즈로 자동 이동
        setCurrentPhase(2);
      }
    } else {
      if (currentCardIndex > 0) {
        setCurrentCardIndex(currentCardIndex - 1);
      }
    }
  };

  // 2페이즈에서 3페이즈로 이동
  const moveToPhase3 = () => {
    setCurrentPhase(3);
  };

  // 3페이즈: 문제 답변 처리
  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    const currentQuestion = DUMMY_QUESTION_LIST[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.answer;

    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }

    // 답변 기록
    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: currentQuestion,
        userAnswer: answer,
        isCorrect,
      },
    ]);
  };

  // 다음 문제로 이동
  const handleNextQuestion = () => {
    if (currentQuestionIndex < DUMMY_QUESTION_LIST.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setShowFeedback(false);
    } else {
      // 마지막 문제면 결과 페이즈로
      setCurrentPhase(4);
    }
  };

  // 다시 시작
  const handleRestart = () => {
    navigate("/");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        로딩중
      </div>
    );

  // 1페이즈: 카드 형태
  if (currentPhase === 1) {
    const currentWord = DUMMY_WORD_LIST[currentCardIndex];

    return (
      <div className="max-w-md mx-auto  flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">외우기 페이즈</h1>
          <div className="text-lg text-gray-600">
            {currentCardIndex + 1} / {DUMMY_WORD_LIST.length}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 w-full h-64 flex items-center justify-center shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {currentWord.text}
              </div>
              <div className="text-lg text-gray-500">
                {currentWord.phonetic}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => handleCardNavigation("prev")}
            disabled={currentCardIndex === 0}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium"
          >
            이전
          </button>

          <div className="bg-gray-200 px-4 py-2 rounded-lg">
            {currentCardIndex + 1} / {DUMMY_WORD_LIST.length}
          </div>

          <button
            onClick={() => handleCardNavigation("next")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            {currentCardIndex === DUMMY_WORD_LIST.length - 1 ? "완료" : "다음"}
          </button>
        </div>
      </div>
    );
  }

  // 2페이즈: 리스트 형태
  if (currentPhase === 2) {
    return (
      <div className="max-w-md mx-auto p-6  flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">복습 페이즈</h1>
          <div className="text-lg text-gray-600">단어 목록 확인</div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto">
          {DUMMY_WORD_LIST.map((word) => (
            <div
              key={word.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    {word.text}
                  </div>
                  <div className="text-sm text-gray-500">{word.phonetic}</div>
                </div>
                <div className="text-lg text-blue-600 font-medium">
                  {word.definition}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={moveToPhase3}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium"
          >
            테스트 시작
          </button>
        </div>
      </div>
    );
  }

  // 3페이즈: 문제 풀이
  if (currentPhase === 3) {
    const currentQuestion = DUMMY_QUESTION_LIST[currentQuestionIndex];

    return (
      <div className="max-w-md mx-auto p-6  flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">테스트 페이즈</h1>
          <div className="text-lg text-gray-600">
            {currentQuestionIndex + 1} / {DUMMY_QUESTION_LIST.length}
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 text-center">
            <div className="text-lg text-gray-600 mb-2">
              {currentQuestion.prompt}
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {currentQuestion.word}
            </div>
          </div>

          <div className="space-y-3">
            {currentQuestion.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(choice)}
                disabled={showFeedback}
                className={`w-full p-4 text-left border-2 rounded-lg font-medium transition-colors ${
                  showFeedback
                    ? choice === currentQuestion.answer
                      ? "bg-green-100 border-green-500 text-green-700"
                      : choice === selectedAnswer
                      ? "bg-red-100 border-red-500 text-red-700"
                      : "bg-gray-100 border-gray-300 text-gray-500"
                    : "bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {choice}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="mt-6 text-center">
              <div
                className={`text-lg font-bold mb-4 ${
                  selectedAnswer === currentQuestion.answer
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {selectedAnswer === currentQuestion.answer
                  ? "정답!"
                  : "틀렸습니다"}
              </div>

              <button
                onClick={handleNextQuestion}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium"
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

  // 4페이즈: 결과 화면
  if (currentPhase === 4) {
    const accuracy = Math.round(
      (correctCount / DUMMY_QUESTION_LIST.length) * 100
    );

    return (
      <div className="max-w-md mx-auto p-6  flex flex-col">
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
              <div className="space-y-2">
                {answeredQuestions
                  .filter((q) => !q.isCorrect)
                  .map((q, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{q.question.word}</span>
                      <span className="text-gray-600">
                        {" "}
                        - 정답: {q.question.answer}
                      </span>
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
          다시 학습하기
        </button>
      </div>
    );
  }

  return null;
}

export default StudyPage;
