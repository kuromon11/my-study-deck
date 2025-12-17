<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Card } from '../interfaces/card';

const route = useRoute();
const deckId = route.params.deckId as string;

const cards = ref<Card[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const headers = [
  { title: 'ID', key: 'id', align: 'center' },
  { title: '質問', key: 'question', align: 'center' },
  { title: '回答', key: 'answer', align: 'center' },
  { title: '最終更新日', key: 'updated_at', align: 'center' },
  { title: '操作', key: 'actions', align: 'center', sortable: false },
];

const fetchCards = async () => {
  loading.value = true;
  error.value = null;

  try {
    const res = await fetch(`http://localhost:8000/api/decks/${deckId}/cards/`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    cards.value = await res.json();
  } catch (e) {
    error.value = 'カード一覧の取得に失敗しました';
    console.error(e);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCards);
</script>

<template>
  <v-container>
    <div class="d-flex align-center position-relative">
      <h4 class="text-h4 mx-auto">カード一覧</h4>
      <div class="position-absolute right-0">
        <v-btn color="success" href="#"> 追加 </v-btn>
        <v-btn color="primary ml-4" href="#"> 学習開始 </v-btn>
      </div>
    </div>

    <v-progress-circular v-if="loading" indeterminate />

    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>

    <v-data-table
      :headers="headers"
      :items="cards"
      :loading="loading"
      item-key="id"
      class="columns"
    >
      <template #item.question="{ item }">
        <span class="ellipsis">
          {{ item.question }}
        </span>
      </template>
      <template #item.answer="{ item }">
        <span class="ellipsis">
          {{ item.answer }}
        </span>
      </template>
      <template #item.actions="{ item }">
        <v-btn icon variant="text">
          <v-icon icon="mdi-pencil" />
        </v-btn>
      </template>
    </v-data-table>

    <p v-if="!loading && !error && cards.length === 0">カードがありません</p>
  </v-container>
</template>
