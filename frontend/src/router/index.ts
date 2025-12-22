import { createRouter, createWebHistory } from 'vue-router';
import DeckListView from './../views/DeckListView.vue';
import CardListView from './../views/CardListView.vue';
import StudyView from './../views/StudyView.vue';

const routes = [
  {
    path: '/',
    name: 'decks',
    component: DeckListView,
  },
  {
    path: '/:deckId/cards',
    name: 'cards',
    component: CardListView,
    props: true,
  },
  {
    path: '/:deckId/study',
    name: 'study',
    component: StudyView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
