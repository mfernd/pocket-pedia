<script setup>
import { onMounted, ref, watch } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import PokemonCard from '@/components/PokemonCard.vue';
import { getList } from '@/services/pokeapi/getList';

const pokemonsArray = ref([]);
const pokemonsRendered = ref([]);
const pokemonQuery = ref('');

onMounted(() => {
  getList().then((res) => {
    pokemonsArray.value = res;
    pokemonsRendered.value = res;
  });
});

watch(pokemonQuery, (query) => {
  if ('' === query.trim()) {
    pokemonsRendered.value = pokemonsArray.value;
    return;
  }

  pokemonsRendered.value = pokemonsArray.value.filter((el) => {
    return el.name.toLowerCase().startsWith(query.toLowerCase());
  });
});

const pokemonIsInArray = (pokemon) => pokemonsRendered.value.includes(pokemon);
</script>

<template>
  <SearchBar v-model:search-bar="pokemonQuery" />

  <h2>Liste des Pokémons&nbsp;:</h2>

  <ul id="pokemon-list">
    <li
      v-for="pokemon in pokemonsArray"
      :key="pokemon.speciesId"
      v-show="pokemonIsInArray(pokemon)"
    >
      <PokemonCard :pokemon="pokemon" />
    </li>
  </ul>
</template>

<style>
#pokemon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

#pokemon-list li {
  margin-bottom: 3rem;
}
</style>
