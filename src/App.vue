<script setup>
import { RouterLink, RouterView } from 'vue-router';
import SearchBar from './components/SearchBar.vue';
</script>

<template>
  <header>
    <nav>
      <router-link class="home-link" :to="{ name: 'Home' }">
        <h1 class="card bounce">📚 PocketPedia</h1>
      </router-link>
    </nav>
    <SearchBar />
  </header>

  <router-view />
</template>

<style>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.home-link {
  display: inline-block;
  height: 100%;
}

.home-link > h1 {
  display: inline-block;
  margin: 0;
}
</style>
