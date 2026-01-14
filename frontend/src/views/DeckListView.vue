<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DialogDeckEdit from './../components/DialogDeckEdit.vue';
import { useDecks } from './../composables/useDecks';

const { decks, fetchDecks, createDeck, updateDeck, deleteDeck } = useDecks();

const loading = ref(false);
const dialog = ref(false);
const errorMessage = ref<string>('');
const editingId = ref<number | null>(null);

const headers = [
  { title: 'ID', key: 'id', align: 'center' },
  { title: 'タイトル', key: 'title', align: 'center' },
  { title: '最終更新日', key: 'updated_at', align: 'center' },
  { title: '操作', key: 'actions', align: 'center', sortable: false },
] as const;

const onSave = async (id: number | null, payload: { title: string }) => {
  loading.value = true;

  try {
    id === null ? await createDeck(payload) : await updateDeck(id, payload);
  } catch (error: any) {
    errorMessage.value = error?.message ?? 'デッキの保存に失敗しました';
  } finally {
    dialog.value = false;
    loading.value = false;
  }
};

const onDelete = async (id: number) => {
  loading.value = true;

  try {
    await deleteDeck(id);
  } catch (error: any) {
    errorMessage.value = error?.message ?? 'デッキの取得に失敗しました';
  } finally {
    dialog.value = false;
    loading.value = false;
  }
};

onMounted(async () => {
  loading.value = true;

  try {
    await fetchDecks();
  } catch (error: any) {
    errorMessage.value = error?.message ?? 'デッキの取得に失敗しました';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-container>
    <div class="d-flex align-center position-relative">
      <h4 class="text-h4 mx-auto">デッキ一覧</h4>
      <div class="position-absolute right-0">
        <v-btn
          size="small"
          color="success"
          @click="
            editingId = null;
            dialog = true;
          "
        >
          追加
        </v-btn>
      </div>
    </div>
    <p class="my-2">デッキのタイトルを選択すると、カード一覧が表示されます。</p>

    <v-alert v-if="errorMessage !== ''" type="error" class="mb-4">
      {{ errorMessage }}
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
        <v-btn
          icon
          variant="text"
          @click="
            editingId = item.id;
            dialog = true;
          "
        >
          <v-icon icon="mdi-pencil" />
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="560">
      <DialogDeckEdit
        :editingId="editingId"
        :loading="loading"
        :deck="decks.find(({ id }) => id === editingId)"
        @close="dialog = false"
        @save="onSave"
        @delete="onDelete"
      />
    </v-dialog>
  </v-container>
</template>

<style scoped>
h1 {
  font-weight: 500;
}
</style>
