<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Deck } from '../interfaces/deck';
import { useDecks } from './../composables/useDecks';

const { decks, fetchDecks, createDeck, updateDeck } = useDecks();

const loading = ref(false);
const error = ref(null);

const headers = [
  { title: 'ID', key: 'id', align: 'center' },
  { title: 'タイトル', key: 'title', align: 'center' },
  { title: '最終更新日', key: 'updated_at', align: 'center' },
  { title: '操作', key: 'actions', align: 'center', sortable: false },
];

const rules = {
  required: (v: string) => !!v?.trim() || '必須です',
  max50: (v: string) => (v?.length ?? 0) <= 50 || '50文字以内にしてください',
};

const dialog = ref(false);
const editingId = ref<number | null>(null);

const formValid = ref(false);
const saving = ref(false);

const form = ref({
  title: '',
});

const openCreate = () => {
  editingId.value = null;
  form.value = { title: '' };
  dialog.value = true;
};

const openEdit = (item: Deck) => {
  editingId.value = item.id;
  form.value = { title: item.title ?? '' };
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  form.value = { title: '' };
  editingId.value = null;
};

const save = async () => {
  if (!formValid.value) return;
  saving.value = true;

  const payload = { title: form.value.title.trim() };
  const id = editingId.value;

  if (id == null) {
    const created = await createDeck(payload);
    decks.value = [created, ...decks.value];
    dialog.value = false;
    saving.value = false;
    return;
  }

  const updated = await updateDeck(id, payload);
  decks.value = decks.value.map((d) =>
    d.id === id ? { ...d, ...updated } : d
  );
  dialog.value = false;
  saving.value = false;
};

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;
    await fetchDecks();
    loading.value = false;
  } catch (err: any) {
    error.value = err.message;
  }
});
</script>

<template>
  <v-container>
    <div class="d-flex align-center position-relative">
      <h4 class="text-h4 mx-auto">デッキ一覧</h4>
      <div class="position-absolute right-0">
        <v-btn size="small" color="success" @click="openCreate"> 追加 </v-btn>
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
        <v-btn icon variant="text" @click="openEdit(item)">
          <v-icon icon="mdi-pencil" />
        </v-btn>
      </template>
    </v-data-table>

    <!-- 登録/編集モーダル -->
    <v-dialog v-model="dialog" max-width="560">
      <v-card>
        <v-card-title class="text-h6">
          {{ editingId ? 'デッキ編集' : 'デッキ登録' }}
        </v-card-title>

        <v-card-text>
          <v-form v-model="formValid" @submit.prevent>
            <v-text-field
              v-model="form.title"
              label="タイトル"
              :rules="[rules.required, rules.max50]"
              @keydown.enter.prevent
            />
          </v-form>
        </v-card-text>

        <v-card-actions class="d-flex justify-space-between">
          <div>
            <v-btn
              v-if="editingId"
              variant="text"
              color="error"
              :loading="deleting"
              @click="onDelete(editingId)"
            >
              削除
            </v-btn>
          </div>
          <div class="d-flex align-center ga-2">
            <v-btn variant="text" @click="closeDialog">キャンセル</v-btn>
            <v-btn
              type="submit"
              color="primary"
              :loading="saving"
              :disabled="!formValid"
              @click="save"
            >
              保存
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
h1 {
  font-weight: 500;
}
</style>
