<script setup>
defineProps({
  speciesId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  types: {
    type: Array,
    required: true,
  },
});

const artworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;
</script>

<template>
  <router-link :to="{ name: 'PokemonDetails', params: { id: speciesId } }">
    <div class="card pokemon-card">
      <img
        :src="`${artworkUrl}/${speciesId}.png`"
        :alt="`Sprite du pokémon ${name}`"
      />
      <div class="pokemon-info">
        <p class="pokemon-id">#{{ speciesId }}</p>
        <h2>{{ name }}</h2>
        <div class="pills">
          <span
            v-for="pokemonType in types"
            :key="pokemonType"
            :class="`pill background-color-${pokemonType}`"
          >
            {{ pokemonType }}
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 200px;
}

.pokemon-info {
  width: 100%;
}

.pokemon-id {
  color: #333;
  font-weight: bold;
}

img {
  width: 100%;
  background-color: #f2f2f2;
  border-radius: 5px;
  position: relative;
}

h2 {
  margin: 0.2rem 0 7px;
}

p {
  margin: 0.3rem 0 0.5rem;
  color: #919191;
}
</style>
