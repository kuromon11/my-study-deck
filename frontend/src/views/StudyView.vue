<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const cards = ref([]);
const currentIndex = ref(0);
const showAnswer = ref(false);

const currentCard = computed(() => cards.value[currentIndex.value]);

const nextCard = () => {
  if (currentIndex.value < cards.value.length - 1) {
    currentIndex.value++;
    showAnswer.value = false;
  }
};

const handleCorrect = () => nextCard();
const handleIncorrect = () => nextCard();
const handleSkip = () => nextCard();

onMounted(() => {
  cards.value = [
    { question: 'Vue.jsとは何か？', answer: 'JavaScriptのフレームワーク' },
    { question: 'v-ifの用途は？', answer: '条件付きレンダリング' },
  ];
});
</script>

<template>
  <div class="study-view">
    <div v-if="cards.length > 0" class="card-container">
      <div class="progress">{{ currentIndex + 1 }} / {{ cards.length }}</div>

      <div class="card">
        <div class="question">
          <h2>{{ currentCard.question }}</h2>
        </div>

        <div v-if="showAnswer" class="answer">
          <p>{{ currentCard.answer }}</p>
        </div>

        <button
          v-if="!showAnswer"
          @click="showAnswer = true"
          class="btn btn-primary"
        >
          答えを見る
        </button>

        <div v-if="showAnswer" class="buttons">
          <button @click="handleCorrect" class="btn btn-success">○</button>
          <button @click="handleIncorrect" class="btn btn-danger">×</button>
          <button @click="handleSkip" class="btn btn-secondary">
            スキップ
          </button>
        </div>
      </div>
    </div>

    <div v-else class="completion">
      <p>すべてのカードが完了しました！</p>
    </div>
  </div>
</template>
