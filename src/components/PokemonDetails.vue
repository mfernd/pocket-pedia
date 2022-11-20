<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import * as Utils from '@/services/pokeapi/pokeapiUtils';
import { getDetails } from '@/services/pokeapi/getInfo';
import { createStatsChart } from '@/services/radarChart';
import { tr } from '@/services/translator';
import PokemonSprites from './PokemonSprites.vue';

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
  <div id="pokemon-details">
    <section id="pokemon-details-header">
      <article class="first-column card">
        <PokemonSprites
          :pokemonName="pokemon.name"
          :pokemonSize="pokemon.height"
          :sprites="pokemon.sprites"
        />
        <h1 id="pokemon-details-name">
          {{ pokemon.name }} (#{{ pokemon.id }})
        </h1>
        <h2>{{ pokemon.category }}</h2>
        <h3 v-if="pokemon.isLegendary">Pokémon Légendaire</h3>
        <h3 v-if="pokemon.isMythical">Pokémon Mythique</h3>
        <p class="pills">
          <span
            v-for="pokemonType in pokemon.types"
            :key="pokemonType"
            :class="`pill background-color-${pokemonType.class}`"
          >
            {{ pokemonType.name }}
          </span>
        </p>
      </article>

      <div class="second-column card">
        <article id="pokemon-details-description">
          <h3>{{ tr.messages.pokDetails.description }}</h3>
          <p>{{ pokemon.description }}</p>
        </article>
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
    </section>

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
  </div>
</template>

<style>
h3 {
  margin-top: 0;
}

@media only screen and (max-width: 1280px) {
  #pokemon-details {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #pokemon-details-header {
    justify-content: center !important;
  }
}

#pokemon-details {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

#pokemon-details-header {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: start;
  gap: 2rem;
}

#pokemon-details-header > * {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  max-width: 100%;
}

#pokemon-details-header > .first-column {
  width: 350px;
}

#pokemon-details-header > .second-column {
  width: 500px;
}

#pokemon-details-header h1 {
  text-transform: capitalize;
  margin: 0;
}

#pokemon-details-header h2,
#pokemon-details-header h3 {
  margin: 0;
}

#pokemon-details-header .second-column h3 {
  margin-bottom: 0.5rem;
}

#pokemon-details-header p {
  font-size: 1.2rem;
  margin: 0;
}

#pokemon-details-stats {
  width: 500px;
  max-width: 100%;
}
</style>
