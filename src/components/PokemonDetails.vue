<script setup>
import { onMounted, ref } from 'vue';
import { createStatsChart } from '@/services/radarChart.js';

const pokemon = {
  speciesId: 146, // from csv
  name: 'Sulfura', // from csv
  description:
    "Il s'agit d'un des Pokémon oiseaux légendaires. " + // /pokemon-species/:id
    "Des flammes rouges d'une grande beauté étincellent lorsqu'il bat des ailes.",
  sprite: {
    // sprites.versions['generation-v']['black-white'].animated['front_default']
    animated:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/146.gif',
    // sprites.other['official-artwork']['front_default']
    artwork:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/146.png',
    // sprites['front_default']
    default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png',
  }, // /pokemon/:id
  category: 'Pokémon Flamme', // /pokemon-species/:id ; genus
  stats: [
    {
      id: 1,
      name: 'hp',
      base_stat: 90,
      effort: 0,
    },
    {
      id: 2,
      name: 'attack',
      base_stat: 100,
      effort: 0,
    },
    {
      id: 3,
      name: 'defense',
      base_stat: 90,
      effort: 0,
    },
    {
      id: 4,
      name: 'special-attack',
      base_stat: 125,
      effort: 3,
    },
    {
      id: 5,
      name: 'special-defense',
      base_stat: 85,
      effort: 0,
    },
    {
      id: 6,
      name: 'speed',
      base_stat: 90,
      effort: 0,
    },
  ], // /pokemon/:id
  moves: [
    'razor-wind',
    'gust',
    'wing-attack',
    'whirlwind',
    'fly',
    'headbutt',
    'take-down',
    'double-edge',
    'leer',
    'roar',
    'ember',
    'flamethrower',
    'hyper-beam',
    'peck',
    'solar-beam',
    'fire-spin',
    'toxic',
    'agility',
    'rage',
    'mimic',
    'double-team',
    'reflect',
    'bide',
    'fire-blast',
    'swift',
    'sky-attack',
    'rest',
    'substitute',
    'snore',
    'curse',
    'protect',
    'mud-slap',
    'detect',
    'sandstorm',
    'endure',
    'swagger',
    'steel-wing',
    'sleep-talk',
    'return',
    'frustration',
    'safeguard',
    'hidden-power',
    'twister',
    'rain-dance',
    'sunny-day',
    'ancient-power',
    'rock-smash',
    'heat-wave',
    'will-o-wisp',
    'facade',
    'secret-power',
    'weather-ball',
    'air-cutter',
    'overheat',
    'aerial-ace',
    'roost',
    'natural-gift',
    'pluck',
    'tailwind',
    'u-turn',
    'flare-blitz',
    'air-slash',
    'brave-bird',
    'giga-impact',
    'defog',
    'ominous-wind',
    'flame-charge',
    'round',
    'sky-drop',
    'incinerate',
    'hurricane',
    'confide',
    'mystical-fire',
    'laser-focus',
    'burn-up',
    'burning-jealousy',
    'dual-wingbeat',
    'scorching-sands',
  ], // /pokemon/:id (optionnel parce qu'il y en a beaucoup)
  abilities: [
    { ability: { id: 46, name: 'pressure' }, isHidden: false, slot: 1 },
    { ability: { id: 49, name: 'flame-body' }, isHidden: true, slot: 3 },
  ], // /pokemon/:id
  types: ['fire', 'flying'], // /pokemon/:id
  height: 2, // /pokemon/:id ; en m
  weight: 60, // /pokemon/:id ; en kg
  isLegendary: true, // /pokemon-species/:id
  isMythical: false, // /pokemon-species/:id
};

// Pour les évolutions : /evolution-chain/:id

const statsChart = ref();

onMounted(() => {
  createStatsChart(statsChart.value);
});
</script>

<template>
  <img
    id="pokemon-details-sprite"
    :src="pokemon.sprite.animated ?? pokemon.sprite.artwork"
    :alt="`Sprite du pokémon ${pokemon.name}`"
  />
  <h1>{{ pokemon.name }} (#{{ pokemon.speciesId }})</h1>
  <h3 v-if="pokemon.isLegendary">Pokémon Légendaire</h3>
  <h3 v-if="pokemon.isMythical">Pokémon Mythique</h3>
  <section id="pokemon-details-wrapper">
    <h2>Informations</h2>
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
          <span
            v-for="ability in pokemon.abilities.map(
              (ability) => ability.ability.name
            )"
            :key="ability"
            class="pill"
          >
            {{ ability }}
          </span>
        </p>
      </article>
    </div>
    <article>
      <h3>Statistiques :</h3>
      <div id="pokemon-stats-wrapper card">
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
  </section>
</template>

<style>
#pokemon-details-sprite {
  width: 100%;
  max-width: 400px;
  image-rendering: pixelated;
}

#pokemon-stats-wrapper {
  width: 50%;
  height: 400px;
}
</style>
