<script setup>
import PokemonCard from '@/components/PokemonCard.vue';

const pokemons = [
  {
    id: 146,
    name: 'Sulfura',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png',
    types: ['fire', 'flying'],
  },
  {
    id: 25,
    name: 'Pikachu',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    types: ['electric'],
  },
];
</script>

<template>
  <h2>Liste des Pokémons&nbsp;:</h2>
  <ul id="pokemon-list">
    <li v-for="pokemon in pokemons" :key="pokemon.id">
      <PokemonCard
        :speciesId="pokemon.id"
        :name="pokemon.name"
        :types="pokemon.types"
      />
    </li>
  </ul>
</template>

<style scoped>
#pokemon-list {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: start;
  gap: 2rem;
}
</style>
