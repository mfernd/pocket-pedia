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
    <div class="pokemon-card-wrapper card bounce">
      <img
        class="pokemon-card-image"
        :src="`${artworkUrl}/${speciesId}.png`"
        :alt="`Sprite du pokémon ${name}`"
      />
      <div class="pokemon-card-info">
        <p class="pokemon-card-id">#{{ speciesId }}</p>
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

<style>
.pokemon-card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 200px;
}

.pokemon-card-info {
  width: 100%;
}

.pokemon-card-id {
  color: #333;
  font-weight: bold;
}

.pokemon-card-image {
  width: 100%;
  background-color: #f2f2f2;
  border-radius: 5px;
  position: relative;
}

.pokemon-card-info h2 {
  margin: 0.2rem 0 7px;
}

.pokemon-card-info p {
  margin: 0.3rem 0 0.5rem;
  color: #919191;
}
</style>
