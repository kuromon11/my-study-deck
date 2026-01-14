import type { Deck } from './../interfaces/deck';
import { DECKS_API_URL } from './../constants/api';

export const list = async () => {
  const response = await fetch(DECKS_API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch decks');
  }
  return (await response.json()) as Deck[];
};

export const create = async (payload: { title: string }) => {
  const response = await fetch(DECKS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `createDeck failed: ${response.status} ${response.statusText} - ${text}`
    );
  }

  return (await response.json()) as Deck;
};

export const update = async (id: number, payload: { title: string }) => {
  const res = await fetch(`${DECKS_API_URL}${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `updateDeck failed: ${res.status} ${res.statusText} - ${text}`
    );
  }

  return (await res.json()) as Deck;
};

export const destroy = async (id: number) => {
  const res = await fetch(`${DECKS_API_URL}${id}/`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `deleteDeck failed: ${res.status} ${res.statusText} - ${text}`
    );
  }
};
