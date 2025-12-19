import { ref } from 'vue';
import type { Card } from './../interfaces/card';
import { DECKS_API_URL } from './../constants/api';

export const useCard = () => {
  const cards = ref<Card[]>([]);

  const fetchCards = async (deckId: number) => {
    const response = await fetch(`${DECKS_API_URL}${deckId}/cards/`);
    if (!response.ok) {
      throw new Error('Failed to fetch cards');
    }
    const data = await response.json();
    cards.value = data;
  };

  return {
    cards,
    fetchCards,
  };
};
