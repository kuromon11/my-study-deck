<script setup lang="ts">
import DeckList from './../components/DeckList.vue';
</script>

<template>
  <v-container>
    <h1>Deck List</h1>
    <v-alert type="info" class="mb-4"> デッキ一覧画面 </v-alert>
    <DeckList />
  </v-container>
</template>
