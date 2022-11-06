<script setup>
import { onMounted, ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import PokemonCard from '@/components/PokemonCard.vue';
import { getList } from '@/services/pokeapi/getList';

const pokemons = ref([]);

onMounted(() => {
  getList().then((res) => {
    pokemons.value = res;
    console.log(res);
  });
});
</script>

<template>
  <SearchBar />
  <h2>Liste des Pokémons&nbsp;:</h2>
  <ul id="pokemon-list">
    <li v-for="pokemon in pokemons" :key="pokemon.speciesId">
      <PokemonCard :pokemon="pokemon" />
    </li>
  </ul>
</template>

<style>
#pokemon-list {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
}

#pokemon-list li {
  margin-bottom: 2rem;
  text-transform: capitalize;
}
</style>
