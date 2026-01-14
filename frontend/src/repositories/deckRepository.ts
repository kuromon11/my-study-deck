import type { Deck } from './../interfaces/deck';
import { DECKS_API_URL } from './../constants/api';

interface Payload {
  title: string;
}

export const list = async (): Promise<Deck[]> => {
  const response = await fetch(DECKS_API_URL);
  if (!response.ok) {
    throw new Error(`${response.status}: デッキの取得に失敗しました`);
  }
  return (await response.json()) as Deck[];
};

export const create = async (payload: Payload): Promise<Deck> => {
  const response = await fetch(DECKS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`${response.status}: デッキの登録に失敗しました`);
  }
  return (await response.json()) as Deck;
};

export const update = async (id: number, payload: Payload): Promise<Deck> => {
  const response = await fetch(`${DECKS_API_URL}${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`${response.status}: デッキの更新に失敗しました`);
  }
  return (await response.json()) as Deck;
};

export const destroy = async (id: number): Promise<void> => {
  const response = await fetch(`${DECKS_API_URL}${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`${response.status}: デッキの削除に失敗しました`);
  }
};
