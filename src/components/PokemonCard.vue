<script setup>
defineProps(['pokemon']);
</script>

<template>
  <router-link
    :to="{ name: 'PokemonDetails', params: { id: pokemon.speciesId } }"
  >
    <div class="pokemon-card-wrapper card bounce">
      <img
        class="pokemon-card-image"
        :src="pokemon.sprite"
        :alt="`Sprite du pokémon ${pokemon.name}`"
      />
      <div class="pokemon-card-info">
        <p class="pokemon-card-id">#{{ pokemon.speciesId }}</p>
        <h2>{{ pokemon.name }}</h2>
        <div class="pills">
          <span
            v-for="pokemonType in pokemon.types"
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
  max-width: 200px;
  background-color: #f2f2f2;
  border-radius: 5px;
  position: relative;
  image-rendering: pixelated;
}

.pokemon-card-info h2 {
  margin: 0.2rem 0 7px;
}

.pokemon-card-info p {
  margin: 0.3rem 0 0.5rem;
  color: #919191;
}
</style>
