<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Deck } from '../interfaces/deck';

interface Props {
  loading: boolean;
  editingId: number | null;
  deck?: Deck;
}
const props = defineProps<Props>();

const form = ref({ title: '' });
const formValid = ref(false);
const rules = {
  required: (v: string) => !!v?.trim() || '必須です',
  max50: (v: string) => (v?.length ?? 0) <= 50 || '50文字以内にしてください',
};

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', editingId: number | null, form: { title: string }): void;
  (e: 'delete', id: number): void;
}>();

onMounted(() => {
  if (props.deck) {
    form.value = { ...props.deck };
  }
});
</script>

<template>
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
          :loading="loading"
          @click="emit('delete', editingId)"
        >
          削除
        </v-btn>
      </div>
      <div class="d-flex align-center ga-2">
        <v-btn variant="text" :loading="loading" @click="emit('close')"
          >キャンセル</v-btn
        >
        <v-btn
          type="submit"
          color="primary"
          :loading="loading"
          :disabled="!formValid"
          @click="emit('save', editingId, form)"
        >
          保存
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>
