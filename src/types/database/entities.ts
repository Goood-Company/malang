// types/database/entities.ts

export interface User {
  id: string;
  user_name: string;
  user_email: string;
  social_id: string;
  provider: "google" | "apple" | "kakao";
  created_at: string;
}

export interface Book {
  id: string;
  title: string;
  description: string | null;
  tags: string[];
  creator_id: string;
  is_public: boolean;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  created_at: string;
}
export interface BookTag {
  id: string;
  book_id: string;
  tag_id: string;
  created_at: string;
}

export interface Word {
  id: string;
  text: string;
  phonetic: string | null;
  created_at: string;
}

export interface Definition {
  id: string;
  word_id: string;
  definition: string;
  example_sentence: string | null;
  part_of_speech: string;
  order: number;
  created_at: string;
}

export interface BookWord {
  id: string;
  book_id: string;
  word_id: string;
  order: number;
  created_at: string;
}

export interface UserBook {
  id: string;
  user_id: string;
  book_id: string;
  selected_at: string;
}

export interface UserWordProgress {
  id: string;
  user_id: string;
  book_id: string;
  word_id: string;
  last_seen_at: string | null;
  wrong_count: number;
  is_marked_difficult: boolean;
}

// LearningSession: 유저가 단어장을 가지고 학습을 시작한 하나의 세션
export interface LearningSession {
  id: string;
  user_id: string;
  book_id: string;
  started_at: string; // 세션 시작 시간
  ended_at: string | null; // 세션 완료 시각 (null이면 진행 중)
  type: "study" | "review"; // 일반 학습 or 복습
  total_words: number;
  correct_count: number;
  incorrect_count: number;
  current_phase: 1 | 2 | 3 | null; // 현재 진행 중인 페이즈 (null이면 종료)
  phase1_completed: boolean;
  phase2_completed: boolean;
  phase3_completed: boolean;
}

// LearningSessionWord: 한 세션에서 유저가 단어별로 어떤 반응을 했는지 기록
export interface LearningSessionWord {
  id: string;
  session_id: string;
  word_id: string;
  phase1_checked_unknown: boolean; // 1페이즈에서 모른다고 체크했는가
  phase2_reviewed: boolean; // 2페이즈에서 학습 완료했는가
  phase3_correct: boolean; // 3페이즈 테스트에서 맞췄는가
  is_final_learned: boolean; // 이 단어가 이번 세션을 통해 '암기 완료' 상태로 간주되는가
}

// Optional: LearningSessionPhaseLog (유저의 학습 중단 시각, 재시작, 시간 측정 등을 위한 로그 테이블)
export interface LearningSessionPhaseLog {
  id: string;
  session_id: string;
  phase: 1 | 2 | 3;
  started_at: string;
  ended_at: string | null;
  status: "in_progress" | "completed" | "aborted";
}

export interface Question {
  id: string;
  word_id: string;
  type:
    | "eng_to_kor_choice"
    | "eng_to_eng_choice"
    | "kor_to_eng_choice"
    | "eng_to_kor_blank"
    | "eng_to_eng_blank"
    | "kor_to_eng_blank";
  prompt: string;
  choices: string[] | null;
  answer: string;
  explanation?: string;
}
