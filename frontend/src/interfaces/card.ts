export interface Card {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

export interface CardDetail extends Card {
  notes: string;
}
