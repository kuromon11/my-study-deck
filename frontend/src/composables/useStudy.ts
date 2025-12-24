import { ref } from 'vue';
import type { CardWithLogs } from './../interfaces/card';
import { DECKS_API_URL } from './../constants/api';

export const useStudy = (deckId: number) => {
  const cards = ref<CardWithLogs[]>([]);

  const fetchCardsWithLogs = async () => {
    const response = await fetch(`${DECKS_API_URL}${deckId}/cards-with-logs/`);
    if (!response.ok) {
      throw new Error('Failed to fetch cards');
    }
    const data = await response.json();
    cards.value = data;
  };

  const createLog = async (cardId: number, isCorrect: boolean) => {
    const payload = { is_correct: isCorrect };
    const res = await fetch(
      `${DECKS_API_URL}${deckId}/cards/${cardId}/study/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `createCard failed: ${res.status} ${res.statusText} - ${text}`
      );
    }

    return (await res.json()) as CardWithLogs;
  };

  return {
    cards,
    fetchCardsWithLogs,
    createLog,
  };
};
