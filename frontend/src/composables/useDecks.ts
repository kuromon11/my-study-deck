import { ref } from 'vue';
import type { Deck } from './../interfaces/deck';
import {
  list,
  create,
  update,
  destroy,
} from './../repositories/deckRepository';

export const useDecks = () => {
  const decks = ref<Deck[]>([]);

  const fetchDecks = async () => {
    try {
      const data = await list();
      decks.value = data;
    } catch (error) {
      throw new Error('Failed to fetch decks');
    }
  };

  const createDeck = async (payload: { title: string }) => {
    try {
      const data = await create(payload);
      return data;
    } catch (error) {
      throw new Error('Failed to create decks');
    }
  };

  const updateDeck = async (id: number, payload: { title: string }) => {
    try {
      const data = await update(id, payload);
      return data;
    } catch (error) {
      throw new Error('Failed to update decks');
    }
  };

  const deleteDeck = async (id: number) => {
    try {
      await destroy(id);
    } catch (error) {
      throw new Error('Failed to delete decks');
    }
  };

  return { decks, fetchDecks, createDeck, updateDeck, deleteDeck };
};
