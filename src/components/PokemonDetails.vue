<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import * as Utils from '@/services/pokeapi/pokeapiUtils';
import { getDetails } from '@/services/pokeapi/getInfo';
import { createStatsChart } from '@/services/radarChart';
import { tr } from '@/services/translator';

const pokemon = ref({
  id: 0,
  name: 'Unknown',
  sprites: {
    animated: '',
    artwork: '',
    default: Utils.getDefaultUrls(0),
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

onBeforeMount(async () => {
  const route = useRoute();
  pokemon.value = await getDetails(route.params.id);
  createStatsChart(statsChart.value, pokemon.value.stats);
});
</script>

<template>
  <article id="pokemon-details-header">
    <div class="card">
      <img
        id="pokemon-details-sprite"
        :src="pokemon.sprites.animated?.front ?? pokemon.sprites.default.front"
        :alt="`Sprite du pokémon ${pokemon.name}`"
      />
      <h1 id="pokemon-details-name">{{ pokemon.name }} (#{{ pokemon.id }})</h1>
      <h2>{{ pokemon.category }}</h2>
      <h3 v-if="pokemon.isLegendary">Pokémon Légendaire</h3>
      <h3 v-if="pokemon.isMythical">Pokémon Mythique</h3>
      <div class="pills">
        <span
          v-for="pokemonType in pokemon.types"
          :key="pokemonType"
          :class="`pill background-color-${pokemonType.class}`"
        >
          {{ pokemonType.name }}
        </span>
      </div>
    </div>

    <div class="card">
      <article>
        <h3>{{ tr.messages.pokDetails.height }} {{ pokemon.height }}m</h3>
        <h3>{{ tr.messages.pokDetails.weight }} {{ pokemon.weight }}kg</h3>
      </article>
      <article>
        <h3>{{ tr.messages.pokDetails.abilities }}</h3>
        <p class="pills">
          <span
            v-for="ability in pokemon.abilities"
            :key="ability"
            class="pill"
          >
            {{ ability }}
          </span>
        </p>
      </article>
    </div>
  </article>

  <article id="pokemon-details-description" class="card">
    <h3>{{ tr.messages.pokDetails.description }}</h3>
    <p>{{ pokemon.description }}</p>
  </article>

  <article id="pokemon-details-stats" class="card">
    <h3>{{ tr.messages.pokDetails.stats }}</h3>
    <div>
      <canvas ref="statsChart"></canvas>
    </div>
  </article>
  <article id="pokemon-details-moves" class="card">
    <h3>{{ tr.messages.pokDetails.moves }}</h3>
    <p class="pills">
      <span v-for="move in pokemon.moves" :key="move" class="pill">
        {{ move }}
      </span>
    </p>
  </article>
</template>

<style>
#pokemon-details-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: start;
  gap: 2rem;
  margin-bottom: 2rem;
}

#pokemon-details-header > * {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#pokemon-details-name {
  text-transform: capitalize;
  margin: 1rem 0 0;
}

#pokemon-details-sprite {
  align-self: center;
  width: 200px;
  image-rendering: pixelated;
}

#pokemon-details-description {
  margin-bottom: 2rem;
}

#pokemon-details-description p {
  font-size: 1.2rem;
}

#pokemon-details-stats {
  margin-bottom: 2rem;
  width: 500px;
}

#pokemon-details-moves {
  margin-bottom: 2rem;
}
</style>
