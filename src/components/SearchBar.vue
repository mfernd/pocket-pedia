<script setup>
import { tr } from '@/services/translator';
defineProps({
  searchBar: String,
});
defineEmits(['update:searchBar']);
</script>

<template>
  <div id="search-bar-wrapper" class="card" role="search">
    <label for="search-input"></label>
    <input
      :value="searchBar"
      @input="$emit('update:searchBar', $event.target.value)"
      id="search-input"
      type="search"
      :placeholder="tr.messages.searchPlaceholder"
      maxlength="50"
      autocomplete="off"
    />
  </div>
</template>

<style>
#search-bar-wrapper {
  width: 100%;
  max-width: 700px;
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
}

#search-input {
  font-size: 1.5rem;
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
}

@media only screen and (max-width: 1280px) {
  #search-bar-wrapper {
    width: calc(100% - 5rem);
  }
}
</style>
