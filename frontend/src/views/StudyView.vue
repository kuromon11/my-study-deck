<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStudy } from '../composables/useStudy';

const route = useRoute();
const deckId = route.params.deckId as string;

const { cards, fetchCardsWithLogs, createLog } = useStudy(Number(deckId));
const currentIndex = ref(0);
const showAnswer = ref(false);

const currentCard = computed(() => cards.value[currentIndex.value]!);

const completionModal = ref(false);

const nextCard = () => {
  if (currentIndex.value < cards.value.length) {
    showAnswer.value = false;
    currentIndex.value++;
  }
  if (currentIndex.value === cards.value.length) {
    completionModal.value = true;
  }
};

const handleAnswer = async (answer: boolean) => {
  await createLog(Number(currentCard.value.id), answer);
  nextCard();
};

const handleSkip = () => nextCard();

const loading = ref(true);
onMounted(async () => {
  currentIndex.value = 0;
  completionModal.value = false;
  await fetchCardsWithLogs();
  loading.value = false;
});
</script>

<template>
  <v-container fluid class="pa-4">
    <v-row v-if="!loading" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="5">
        <div class="d-flex justify-space-between align-center">
          <router-link :to="`/${deckId}/cards`">
            <v-btn variant="text" color="grey"> カード一覧に戻る </v-btn>
          </router-link>
        </div>
        <div v-if="!completionModal && cards.length > 0" class="mb-4">
          <div class="text-body-2 text-center">
            正答率:
            {{
              Math.round(
                (currentCard.study_logs.filter(
                  ({ is_correct }) => is_correct === true
                ).length /
                  currentCard.study_logs.length) *
                  100
              )
            }}%
          </div>
        </div>
        <div v-if="cards.length > 0" class="d-flex align-center mb-4 mt-2">
          <div class="text-body-2">{{ currentIndex }} / {{ cards.length }}</div>
          <v-spacer />
          <div class="text-body-2">
            {{ Math.round((currentIndex / cards.length) * 100) }}%
          </div>
        </div>

        <v-progress-linear
          :model-value="Math.round((currentIndex / cards.length) * 100)"
          height="8"
          rounded
          class="mb-4"
        />

        <v-card
          v-if="!completionModal && cards.length > 0"
          variant="outlined"
          class="rounded-lg"
        >
          <v-card-text>
            <div class="text-subtitle-1 font-weight-medium mb-3">
              {{ currentCard.question }}
            </div>
            <div v-if="showAnswer" class="text-body-1 answer-text mb-2">
              {{ currentCard.answer }}
            </div>

            <div class="d-flex flex-wrap ga-2 mt-4">
              <div v-if="!showAnswer" class="flex-grow-1">
                <v-btn
                  v-if="!showAnswer"
                  color="primary"
                  variant="flat"
                  class="flex-grow-1"
                  @click="showAnswer = true"
                >
                  答えを見る
                </v-btn>
                <v-btn
                  variant="flat"
                  class="flex-grow-1 ml-2"
                  @click="handleSkip"
                >
                  スキップ
                </v-btn>
              </div>

              <template v-else>
                <v-btn
                  color="success"
                  variant="flat"
                  class="flex-grow-1"
                  @click="handleAnswer(true)"
                >
                  ○
                </v-btn>
                <v-btn
                  color="error"
                  variant="flat"
                  class="flex-grow-1"
                  @click="handleAnswer(false)"
                >
                  ×
                </v-btn>
                <v-btn variant="flat" class="flex-grow-1" @click="handleSkip">
                  スキップ
                </v-btn>
              </template>
            </div>
          </v-card-text>
        </v-card>

        <div v-else-if="completionModal">
          <v-alert type="success" variant="tonal">
            すべてのカードが完了しました。お疲れ様でした！
          </v-alert>
          <div class="d-flex justify-center mt-4">
            <v-btn
              color="primary"
              variant="text"
              @click="
                currentIndex = 0;
                completionModal = false;
              "
            >
              最初から解き直す
            </v-btn>
          </div>
        </div>

        <div v-else-if="cards.length === 0">
          <v-alert type="error" variant="tonal">
            カードが登録されていません。カードを登録してください！
          </v-alert>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.answer-text {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
}
</style>
