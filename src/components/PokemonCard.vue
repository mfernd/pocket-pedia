<script setup>
defineProps(['pokemon']);
</script>

<template>
  <router-link :to="{ name: 'PokemonDetails', params: { id: pokemon.id } }">
    <div class="pokemon-card-wrapper card bounce">
      <div class="pokemon-card-image">
        <img :src="pokemon.sprite" :alt="`Sprite du pokémon ${pokemon.name}`" />
      </div>
      <div class="pokemon-card-info">
        <p class="pokemon-card-id">#{{ pokemon.id }}</p>
        <h2>{{ pokemon.name }}</h2>
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
    </div>
  </router-link>
</template>

<style>
.pokemon-card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}

.pokemon-card-image {
  background-color: #f2f2f2;
  border-radius: 5px;
  height: 200px;
  width: 100%;
}

.pokemon-card-image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.pokemon-card-info {
  width: 100%;
}

.pokemon-card-id {
  color: #333;
  font-weight: bold;
}

.pokemon-card-info h2 {
  text-transform: capitalize;
  margin: 0.2rem 0 7px;
}

.pokemon-card-info p {
  margin: 0.3rem 0 0.5rem;
  color: #919191;
}
</style>
