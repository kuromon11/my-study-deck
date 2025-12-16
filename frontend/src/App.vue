<script setup lang="ts">
import DeckList from './components/DeckList.vue';
</script>

<template>
  <v-app>
    <v-main class="pa-4">
      <DeckList />
      <v-btn color="primary">Vuetify OK</v-btn>
    </v-main>
  </v-app>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
