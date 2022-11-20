<script setup>
import { onBeforeMount, ref } from 'vue';
import { tr } from '@/services/translator';
import { getEvolutionChain } from '@/services/pokeapi/getEvolutionChain';
const props = defineProps(['evolutionId']);

const evolutionChain = ref([]);
const hasEvolutions = ref(true);

onBeforeMount(async () => {
  evolutionChain.value = await getEvolutionChain(props.evolutionId);
  if (evolutionChain.value.length <= 1) {
    hasEvolutions.value = false;
  }
});
</script>

<template>
  <article class="pokemon-evolutions">
    <h1>
      {{ tr.messages.pokDetails.evolutions }}
      <span v-if="!hasEvolutions">❌</span>
    </h1>
    <ul v-if="hasEvolutions">
      <li
        v-for="pokemon in evolutionChain"
        :key="pokemon.id"
        class="evolution-tile"
      >
        <img
          :src="
            pokemon.sprites.animated?.front ?? pokemon.sprites.default.front
          "
          :alt="`${pokemon.name} sprite`"
        />
        <h2>{{ pokemon.name }}</h2>
        <router-link
          :to="{ name: 'PokemonDetails', params: { id: pokemon.id } }"
          class="evolution-link"
        ></router-link>
      </li>
    </ul>
  </article>
</template>

<style>
.pokemon-evolutions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pokemon-evolutions h1 {
  font-size: 1.5rem;
}

.pokemon-evolutions ul {
  margin: 0;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  height: 100%;
}

.evolution-tile {
  position: relative;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.evolution-tile:hover {
  transition: background-color 75ms ease-in-out;
  background-color: rgba(0, 0, 0, 0.2);
}

.evolution-tile img {
  image-rendering: pixelated;
  width: 50px;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: contain;
}

.evolution-tile h2 {
  font-size: 1.25rem;
}

.evolution-link {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
