import type { Deck } from './../interfaces/deck';
import { createRepository } from './repository';

interface Payload {
  title: string;
}

export const deckRepository = () => {
  const { list, create, update, destroy } = createRepository<Deck, Payload>();
  return { list, create, update, destroy };
};
