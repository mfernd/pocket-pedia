<script setup>
defineProps({
  id: Number,
  name: String,
  spriteUrl: String,
});
</script>

<template>
  <div class="pokemon-card">
    <img :src="spriteUrl" :alt="name" />
    <h2>{{ name }}</h2>
    <span>#{{ id }}</span>
  </div>
</template>

<style scoped>
.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid rgba(20, 20, 20, 1);
  border-radius: 5px;
  min-width: 200px;
}

img {
  width: 100px;
  height: 100px;
}

h2 {
  margin: 0;
}

span {
  color: #333;
  font-weight: bold;
}
</style>
