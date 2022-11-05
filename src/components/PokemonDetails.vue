<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { createStatsChart } from '@/services/radarChart.js';
import { getPokemonDetails } from '@/services/pokeapi/getters';
import * as Utils from '@/services/pokeapi/pokeapiUtils';

const pokemon = ref({
  speciesId: 0,
  name: 'Unknown',
  sprites: {
    animated: '',
    artwork: Utils.getArtworkUrl(0),
    default: '',
  },
  category: [],
  stats: [0, 0, 0, 0, 0, 0],
  moves: [],
  abilities: [],
  types: [],
  height: 0,
  weight: 0,
  isLegendary: false,
  isMythical: false,
});
const statsChart = ref();

onMounted(async () => {
  const route = useRoute();
  pokemon.value = await getPokemonDetails(route.params.id);
  createStatsChart(statsChart.value, pokemon.value.stats);
});
</script>

<template>
  <img
    id="pokemon-details-sprite"
    :src="pokemon.sprites.animated?.front ?? pokemon.sprites.default"
    :alt="`Sprite du pokémon ${pokemon.name}`"
  />
  <h1 id="pokemon-details-name">
    {{ pokemon.name }} (#{{ pokemon.speciesId }})
  </h1>
  <h3 v-if="pokemon.isLegendary">Pokémon Légendaire</h3>
  <h3 v-if="pokemon.isMythical">Pokémon Mythique</h3>
  <article>
    <h3>Description :</h3>
    <p>{{ pokemon.description }}</p>
  </article>
  <div class="card" style="display: inline-block">
    <article>
      <h3>Types :</h3>
      <p class="pills">
        <span
          v-for="pokemonType in pokemon.types"
          :key="pokemonType"
          :class="`pill background-color-${pokemonType}`"
        >
          {{ pokemonType }}
        </span>
      </p>
    </article>
    <article>
      <h3>Catégorie : {{ pokemon.category }}</h3>
    </article>
    <article>
      <h3>Taille : {{ pokemon.height }}m</h3>
      <h3>Poids : {{ pokemon.weight }}kg</h3>
    </article>
    <article>
      <h3>Talent(s) :</h3>
      <p class="pills">
        <span v-for="ability in pokemon.abilities" :key="ability" class="pill">
          {{ ability }}
        </span>
      </p>
    </article>
  </div>
  <article>
    <h3>Statistiques :</h3>
    <div id="pokemon-stats-wrapper" class="card">
      <canvas ref="statsChart"></canvas>
    </div>
  </article>
  <article>
    <h3>Attaque(s) :</h3>
    <p class="pills">
      <span v-for="move in pokemon.moves" :key="move" class="pill">
        {{ move }}
      </span>
    </p>
  </article>
</template>

<style>
#pokemon-details-name {
  text-transform: capitalize;
}

#pokemon-details-sprite {
  width: 200px;
  image-rendering: pixelated;
}

#pokemon-stats-wrapper {
  width: 50%;
  height: 400px;
}
</style>
