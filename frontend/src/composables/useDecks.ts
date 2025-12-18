import { ref } from 'vue';
import type { Deck } from './../interfaces/deck';
import { DECKS_API_URL } from './../constants/api';

export const useDecks = () => {
  const decks = ref<Deck[]>([]);

  const fetchDecks = async () => {
    const response = await fetch(DECKS_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch decks');
    }
    const data = await response.json();
    decks.value = data;
  };

  const createDeck = async (payload: { title: string }) => {
    const res = await fetch(DECKS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `createDeck failed: ${res.status} ${res.statusText} - ${text}`
      );
    }

    return (await res.json()) as Deck;
  };

  const updateDeck = async (id: number, payload: { title: string }) => {
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

  const deleteDeck = async (id: number) => {
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

  return { decks, fetchDecks, createDeck, updateDeck, deleteDeck };
};
