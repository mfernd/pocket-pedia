<script setup>
import PokemonCard from '@/components/PokemonCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import { filterPokemonsByQuery, getList } from '@/services/pokeapi/getList';
import { tr } from '@/services/translator';
import { onBeforeMount, ref, watch } from 'vue';

let pokemonsData = [];
let nbOfPokemon = 20;

const pokemonsRendered = ref([]);
const pokemonQuery = ref('');
const loadingSprite = ref();
const bottomOfList = ref();

// Pokemon list behaviour
onBeforeMount(async () => {
  pokemonsData = await getList();

  loadingSprite.value.remove();

  pokemonsRendered.value = pokemonsData.slice(0, nbOfPokemon);

  // Load more pokemons
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries.find((el) => el.target === bottomOfList.value);
      if (entry !== undefined && !entry.isIntersecting) return;
      if (pokemonsRendered.value.length === pokemonsData.length) return;

      nbOfPokemon += 20;
      const filtered = filterPokemonsByQuery(pokemonsData, pokemonQuery.value);
      pokemonsRendered.value = filtered.slice(0, nbOfPokemon);
    },
    { threshold: 1.0 },
  );
  observer.observe(bottomOfList.value);
});

// Search bar event
watch(pokemonQuery, (query) => {
  if (query === '') {
    nbOfPokemon = 20;
  }

  const filtered = filterPokemonsByQuery(pokemonsData, query);
  pokemonsRendered.value = filtered.slice(0, nbOfPokemon);
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

  <img
    ref="loadingSprite"
    id="loading"
    src="/images/loading.gif"
    alt="loading image"
  />

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

#loading {
  display: block;
  image-rendering: pixelated;
  width: 300px;
  max-width: 100%;
  margin: 3rem auto 0;
}

@media only screen and (max-width: 1280px) {
  #pokemon-list {
    justify-content: center;
    gap: 1.5rem;
  }

  #pokemon-list li {
    margin: 0;
  }
}
</style>
