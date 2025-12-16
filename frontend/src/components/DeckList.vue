<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Deck } from '../interfaces/deck';

const decks = ref<Deck[]>([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/api/decks/');
    if (!response.ok) {
      throw new Error('Failed to fetch decks');
    }
    decks.value = await response.json();
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <h1>デッキ一覧</h1>

    <p v-if="loading">読み込み中...</p>
    <p v-if="error">{{ error }}</p>

    <ul>
      <li v-for="deck in decks" :key="deck.id">
        <p>{{ deck.title }}</p>
        <p>{{ deck.description }}</p>
        <p>{{ deck.created_at }}</p>
        <p>{{ deck.updated_at }}</p>
      </li>
    </ul>
  </div>
</template>
