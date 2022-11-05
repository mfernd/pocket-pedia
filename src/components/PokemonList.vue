<script setup>
import { onMounted, ref } from 'vue';
import PokemonCard from '@/components/PokemonCard.vue';
import { getPokemons } from '@/services/pokeapi/getters';

const pokemons = ref([]);

onMounted(async () => {
  pokemons.value = await getPokemons();
});
</script>

<template>
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
