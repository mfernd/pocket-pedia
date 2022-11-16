<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import PokemonCard from '@/components/PokemonCard.vue';
import { getList, search } from '@/services/pokeapi/getList';
import { tr } from '@/services/translator';

let pokemonsData = [];
let nbOfPokemon = 20;

const pokemonsRendered = ref([]);
const pokemonQuery = ref('');
const bottomOfList = ref();

// Pokemon list behaviour
onBeforeMount(async () => {
  pokemonsData = await getList();
  pokemonsRendered.value = pokemonsData.slice(0, nbOfPokemon);

  // Load more pokemons
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries.find((el) => el.target === bottomOfList.value);
      if (!entry.isIntersecting) return;

      nbOfPokemon += 20;
      const filtered = search(pokemonsData, pokemonQuery.value);
      pokemonsRendered.value = filtered.slice(0, nbOfPokemon);
    },
    { threshold: 1.0 }
  );
  observer.observe(bottomOfList.value);
});

// Search bar event
watch(pokemonQuery, (query) => {
  if (query === '') {
    nbOfPokemon = 20;
  }
  pokemonsRendered.value = search(pokemonsData, query).slice(0, nbOfPokemon);
});
</script>

<template>
  <SearchBar v-model:search-bar="pokemonQuery" />

  <h2>{{ tr.messages.pokemonList }}</h2>

  <ul id="pokemon-list">
    <li v-for="pokemon in pokemonsRendered" :key="pokemon.id">
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
