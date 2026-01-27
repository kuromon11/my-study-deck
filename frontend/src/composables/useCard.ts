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
    cards.value = [data, ...cards.value];
  };

  const updateCard = async (id: number, payload: CardRequest) => {
    const data = await update(id, payload);
    cards.value = cards.value.map((c) => (c.id === id ? { ...c, ...data } : c));
  };

  const deleteCard = async (id: number) => {
    await destroy(id);
    cards.value = cards.value.filter((c) => c.id !== id);
  };

  return {
    cards,
    fetchCards,
    createCard,
    updateCard,
    deleteCard,
  };
};
