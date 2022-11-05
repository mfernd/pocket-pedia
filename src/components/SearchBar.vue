<script setup>
import { onMounted, ref } from 'vue';

const searchBar = ref();

onMounted(() => {
  const searchInput = searchBar.value;

  searchInput.addEventListener('input', (e) => {
    console.log(searchInput.value);
  });
});
</script>

<template>
  <div id="search-bar-wrapper" class="card" role="search">
    <label for="search-input"></label>
    <input
      ref="searchBar"
      id="search-input"
      type="search"
      name="q"
      placeholder="Cherchez votre pokémon !"
      maxlength="50"
      autocomplete="off"
    />
  </div>
</template>

<style>
#search-bar-wrapper {
  width: 100%;
  max-width: 700px;
  margin: 50px 0;
  margin-right: 0;
  padding: 1rem 1.5rem;
}

#search-input {
  font-size: 1.5rem;
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
}
</style>
