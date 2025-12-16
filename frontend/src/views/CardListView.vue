<script setup lang="ts">
interface Props {
  deckId: string;
}

const props = defineProps<Props>();
</script>

<template>
  <v-container>
    <h1>Card List</h1>

    <v-alert type="info" class="mb-4"> Deck ID: {{ deckId }} </v-alert>

    <!-- ここにカード一覧を表示 -->
  </v-container>
</template>
