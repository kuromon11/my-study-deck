export interface Card {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

export interface CardForm {
  question: string;
  answer: string;
}

export interface CardWithLogs {
  id: number;
  question: string;
  answer: string;
  study_logs: StudyLog[];
  created_at: string;
  updated_at: string;
}

export interface StudyLog {
  id: number;
  studied_at: string;
  is_correct: boolean;
}
