<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <router-link class="home-link" :to="{ name: 'Home' }">
        <h1 class="card">📚 PocketPedia</h1>
      </router-link>
    </nav>
  </header>

  <router-view />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.home-link > h1 {
  display: inline-block;
  margin: 0;
}
</style>
