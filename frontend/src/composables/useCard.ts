import { ref } from 'vue';
import type { Card, CardRequest } from './../interfaces/card';
import { cardRepository } from './../repositories/cardRepository';

export const useCard = (deckId: number) => {
  const { list, create, update, destroy } = cardRepository(deckId);

  const cards = ref<Card[]>([]);

  const fetchCards = async () => {
    const data = await list();
    cards.value = data;
  };

  const createCard = async (payload: CardRequest) => {
    const data = await create(payload);
    return data;
  };

  const updateCard = async (id: number, payload: CardRequest) => {
    const data = await update(id, payload);
    return data;
  };

  const deleteCard = async (id: number) => {
    await destroy(id);
  };

  return {
    cards,
    fetchCards,
    createCard,
    updateCard,
    deleteCard,
  };
};
