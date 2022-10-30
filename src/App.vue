<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <router-link :to="{ name: 'Home' }">Accueil</router-link>
    </nav>
  </header>

  <router-view />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
