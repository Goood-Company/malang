/////////
// 학습 시작
/////////
interface StartSessionParams {
  user_id: string;
  book_id: string;
  type: "study" | "review";
  word_ids: string[];
}

/////////
// 처음 외우기 시작
/////////
export function startLearningSession(params: StartSessionParams) {
  return console.log("startLearningSession params : ", params);
}

/////////
// 외우기 중간 (페이즈별)
/////////
interface PhaseResultParams {
  session_id: string;
  phase: 1 | 2 | 3;
  wordResults: Array<{
    word_id: string;
    phase1_checked_unknown?: boolean;
    phase2_reviewed?: boolean;
    phase3_correct?: boolean;
  }>;
}
export function submitPhaseResult(params: PhaseResultParams) {
  return console.log("submitPhaseResult params : ", params);
}

/////////
// 외우기 완료
/////////
export function completeLearningSession(session_id: string) {
  return console.log("completeLearningSession session_id : ", session_id);
}
