<script setup>
import { onMounted, ref, watch } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import PokemonCard from '@/components/PokemonCard.vue';
import { getList } from '@/services/pokeapi/getList';

let pokemonsData = [];
let nbOfPokemon = 20;

const pokemonsRendered = ref([]);
const pokemonQuery = ref('');
const bottomOfList = ref();

// Pokemon list behaviour
onMounted(async () => {
  pokemonsData = await getList();
  pokemonsRendered.value = pokemonsData.slice(0, nbOfPokemon);

  // Load more pokemons
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries.find((el) => el.target === bottomOfList.value);

      if (entry.isIntersecting) {
        nbOfPokemon += 20;
        pokemonsRendered.value = pokemonsData.slice(0, nbOfPokemon);
      }
    },
    { threshold: 1.0 }
  );
  observer.observe(bottomOfList.value);
});

// Search bar event
watch(pokemonQuery, (query) => {
  if ('' === query.trim()) {
    pokemonsRendered.value = pokemonsData.slice(0, 20);
    return;
  }

  pokemonsRendered.value = pokemonsData.filter((el) => {
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
  <div ref="bottomOfList"></div>
</template>

<style>
#pokemon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}

#pokemon-list li {
  margin: 0 0.5rem 3rem;
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
