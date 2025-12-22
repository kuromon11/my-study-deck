<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Card } from '../interfaces/card';
import { useCard } from './../composables/useCard';

const route = useRoute();
const deckId = route.params.deckId as string;

const { cards, fetchCards, createCard, updateCard, deleteCard } = useCard(
  Number(deckId)
);

const loading = ref(false);
const error = ref<string | null>(null);

const headers = [
  { title: 'ID', key: 'id', align: 'center' },
  { title: '質問', key: 'question', align: 'center' },
  { title: '回答', key: 'answer', align: 'center' },
  { title: '最終更新日', key: 'updated_at', align: 'center' },
  { title: '操作', key: 'actions', align: 'center', sortable: false },
];

const rules = {
  required: (v: string) => !!v?.trim() || '必須です',
  max200: (v: string) => (v?.length ?? 0) <= 200 || '200文字以内にしてください',
  max2000: (v: string) =>
    (v?.length ?? 0) <= 2000 || '2000文字以内にしてください',
};

const form = ref({
  question: '',
  answer: '',
});

const dialog = ref(false);
const editingId = ref<number | null>(null);

const openCreate = () => {
  editingId.value = null;
  form.value = { question: '', answer: '' };
  dialog.value = true;
};

const openEdit = (item: Card) => {
  editingId.value = item.id;
  form.value = {
    question: item.question ?? '',
    answer: item.answer ?? '',
  };
  dialog.value = true;
};

const saving = ref(false);
const formValid = ref(false);
const save = async () => {
  if (!formValid.value) return;
  saving.value = true;

  const payload = {
    question: form.value.question.trim(),
    answer: form.value.answer.trim(),
  };
  const id = editingId.value;

  if (id == null) {
    const created = await createCard(payload);
    cards.value = [created, ...cards.value];
    dialog.value = false;
    saving.value = false;
    return;
  }

  const updated = await updateCard(id, payload);
  cards.value = cards.value.map((c) =>
    c.id === id ? { ...c, ...updated } : c
  );
  dialog.value = false;
  saving.value = false;
};

const deleting = ref(false);
const onDelete = async (id: number) => {
  deleting.value = true;
  await deleteCard(id);
  cards.value = cards.value.filter((c) => c.id !== id);
  dialog.value = false;
  deleting.value = false;
};

const closeDialog = () => {
  dialog.value = false;
  form.value = { question: '', answer: '' };
  editingId.value = null;
};

const init = async () => {
  loading.value = true;
  error.value = null;

  try {
    await fetchCards();
    loading.value = false;
  } catch (_) {
    error.value = 'カード一覧の取得に失敗しました';
  }
};

onMounted(init);
</script>

<template>
  <v-container>
    <div class="d-flex align-center position-relative">
      <div class="position-absolute left-0">
        <router-link to="/">
          <v-btn variant="text" color="grey"> デッキ一覧に戻る </v-btn>
        </router-link>
      </div>
      <h4 class="text-h4 mx-auto">カード一覧</h4>
      <div class="position-absolute right-0">
        <v-btn color="success" size="small" @click="openCreate"> 追加 </v-btn>
        <router-link :to="`/${deckId}/study`">
          <v-btn color="primary ml-4" size="small"> 学習開始 </v-btn>
        </router-link>
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
        <v-btn icon variant="text" @click="openEdit(item)">
          <v-icon icon="mdi-pencil" />
        </v-btn>
      </template>
    </v-data-table>

    <p v-if="!loading && !error && cards.length === 0">カードがありません</p>
  </v-container>

  <v-dialog v-model="dialog" max-width="720">
    <v-card>
      <v-card-title>
        {{ editingId ? 'カード編集' : 'カード登録' }}
      </v-card-title>
      <v-card-text>
        <v-form v-model="formValid">
          <v-text-field
            v-model="form.question"
            label="質問"
            :rules="[rules.required, rules.max200]"
            counter="200"
            class="mt-4"
          />
          <v-textarea
            v-model="form.answer"
            label="回答"
            :rules="[rules.required, rules.max2000]"
            counter="2000"
            class="mt-4"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <div>
          <v-btn
            v-if="editingId"
            color="error"
            variant="text"
            :loading="deleting"
            @click="onDelete(editingId)"
          >
            削除
          </v-btn>
        </div>
        <div class="d-flex align-center ga-2">
          <v-btn variant="text" @click="closeDialog"> キャンセル </v-btn>
          <v-btn
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
</template>
