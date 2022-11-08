<script setup>
import { onMounted, ref, watch } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import PokemonCard from '@/components/PokemonCard.vue';
import { getList } from '@/services/pokeapi/getList';

let pokemonsArray = [];
const pokemonsRendered = ref([]);
const pokemonQuery = ref('');

onMounted(() => {
  getList().then((res) => {
    pokemonsArray = res;
    pokemonsRendered.value = res.slice(0, 20);
  });
});

watch(pokemonQuery, (query) => {
  if ('' === query.trim()) {
    pokemonsRendered.value = pokemonsArray.slice(0, 20);
    return;
  }

  pokemonsRendered.value = pokemonsArray.filter((el) => {
    return el.name.toLowerCase().startsWith(query.toLowerCase());
  });
});
</script>

<template>
  <SearchBar v-model:search-bar="pokemonQuery" />

  <h2>Liste des Pokémons&nbsp;:</h2>

  <ul id="pokemon-list">
    <li v-for="pokemon in pokemonsRendered" :key="pokemon.speciesId">
      <PokemonCard :pokemon="pokemon" />
    </li>
  </ul>
  <div id="bottom-of-page"></div>
</template>

<style>
#pokemon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}

#pokemon-list li {
  margin: 0 75rem 3rem;
}

@media only screen and (max-width: 1280px) {
  #app header,
  #app main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #pokemon-list {
    justify-content: center;
    gap: 1.5rem;
  }

  #pokemon-list li {
    margin: 0;
  }
}
</style>
