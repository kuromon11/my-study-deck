import type { Card } from './../interfaces/card';
import { createRepository } from './repository';

interface Payload {
  question: string;
  answer: string;
}

export const cardRepository = (deckId: number) => {
  const { list, create, update, destroy } = createRepository<Card, Payload>(
    `${deckId}/cards/`
  );

  return { list, create, update, destroy };
};
