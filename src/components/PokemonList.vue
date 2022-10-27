<script setup>
import PokemonCard from '@/components/PokemonCard.vue';

const pokemons = [
  {
    id: 146,
    name: 'Sulfura',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png',
  },
  {
    id: 25,
    name: 'Pikachu',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
];
</script>

<template>
  <h1>Pocket-Pedia</h1>
  <h2>Liste des Pokémons&nbsp;:</h2>
  <div id="pokemon-list">
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :id="pokemon.id"
      :name="pokemon.name"
      :sprite-url="pokemon.sprite"
    />
  </div>
</template>

<style scoped>
#pokemon-list {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
}
</style>
