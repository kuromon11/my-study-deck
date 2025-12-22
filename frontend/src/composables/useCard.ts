import { ref } from 'vue';
import type { Card } from './../interfaces/card';
import type { CardForm } from './../interfaces/card';
import { DECKS_API_URL } from './../constants/api';

export const useCard = (deckId: number) => {
  const cards = ref<Card[]>([]);

  const fetchCards = async () => {
    const response = await fetch(`${DECKS_API_URL}${deckId}/cards/`);
    if (!response.ok) {
      throw new Error('Failed to fetch cards');
    }
    const data = await response.json();
    cards.value = data;
  };

  const createCard = async (payload: CardForm) => {
    const res = await fetch(`${DECKS_API_URL}${deckId}/cards/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `createCard failed: ${res.status} ${res.statusText} - ${text}`
      );
    }

    return (await res.json()) as Card;
  };

  const updateCard = async (id: number, payload: CardForm) => {
    const res = await fetch(`${DECKS_API_URL}${deckId}/cards/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `updateCard failed: ${res.status} ${res.statusText} - ${text}`
      );
    }

    return (await res.json()) as Card;
  };

  const deleteCard = async (id: number) => {
    const res = await fetch(`${DECKS_API_URL}${deckId}/cards/${id}/`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `deleteCard failed: ${res.status} ${res.statusText} - ${text}`
      );
    }
  };

  return {
    cards,
    fetchCards,
    createCard,
    updateCard,
    deleteCard,
  };
};
