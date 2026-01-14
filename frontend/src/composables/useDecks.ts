import { ref } from 'vue';
import type { Deck } from './../interfaces/deck';
import { deckRepository } from './../repositories/deckRepository';

export const useDecks = () => {
  const decks = ref<Deck[]>([]);

  const fetchDecks = async () => {
    const { list } = deckRepository();
    const data = await list();
    decks.value = data;
  };

  const createDeck = async (payload: { title: string }) => {
    const { create } = deckRepository();
    const data = await create(payload);
    decks.value = [data, ...decks.value];
  };

  const updateDeck = async (id: number, payload: { title: string }) => {
    const { update } = deckRepository();
    const data = await update(id, payload);
    decks.value = decks.value.map((d) => (d.id === id ? { ...d, ...data } : d));
  };

  const deleteDeck = async (id: number) => {
    const { destroy } = deckRepository();
    await destroy(id);
    decks.value = decks.value.filter((d) => d.id !== id);
  };

  return {
    decks,
    fetchDecks,
    createDeck,
    updateDeck,
    deleteDeck,
  };
};
