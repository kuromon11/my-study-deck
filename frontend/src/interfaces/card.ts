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
  study_logs: {
    id: number;
    studied_at: string;
    is_correct: boolean;
  };
  created_at: string;
  updated_at: string;
}
