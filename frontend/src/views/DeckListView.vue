<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Deck } from '../interfaces/deck';

const decks = ref<Deck[]>([]);
const loading = ref(false);
const error = ref(null);

const headers = [
  { title: 'ID', key: 'id', align: 'center' },
  { title: 'タイトル', key: 'title', align: 'center' },
  { title: '最終更新日', key: 'updated_at', align: 'center' },
  { title: '操作', key: 'actions', align: 'center', sortable: false },
];

const fetchDecks = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch('http://localhost:8000/api/decks/');
    if (!response.ok) {
      throw new Error('Failed to fetch decks');
    }
    const data = await response.json();
    decks.value = data;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchDecks();
});
</script>

<template>
  <v-container>
    <div class="d-flex align-center position-relative">
      <h4 class="text-h4 mx-auto">デッキ一覧</h4>
      <div class="position-absolute right-0">
        <v-btn size="small" color="success" href="#"> 追加 </v-btn>
      </div>
    </div>
    <p class="my-2">デッキのタイトルを選択すると、カード一覧が表示されます。</p>

    <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-data-table
      :headers="headers"
      :items="decks"
      :loading="loading"
      item-key="id"
      class="columns"
    >
      <template #item.title="{ item }">
        <router-link :to="`/${item.id}/cards`" class="ellipsis table-link">
          {{ item.title }}
        </router-link>
      </template>
      <template #item.actions="{ item }">
        <v-btn icon variant="text">
          <v-icon icon="mdi-pencil" />
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>
h1 {
  font-weight: 500;
}
</style>
