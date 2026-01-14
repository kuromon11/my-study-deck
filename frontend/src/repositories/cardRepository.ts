import type { Card, CardRequest } from './../interfaces/card';
import { createRepository } from './repository';

export const cardRepository = (deckId: number) => {
  const { list, create, update, destroy } = createRepository<Card, CardRequest>(
    `${deckId}/cards/`
  );

  return { list, create, update, destroy };
};
