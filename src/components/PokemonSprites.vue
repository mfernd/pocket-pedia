<script setup>
import { ref } from 'vue';
defineProps(['pokemonName', 'pokemonSize', 'sprites']);

const isFront = ref(true);

const handleClickSprite = () => {
  isFront.value = !isFront.value;
};
</script>

<template>
  <div
    id="pokemon-details-sprite"
    @click="handleClickSprite"
    :style="`--pokemonSize: ${Number(pokemonSize / 1.5 ?? 1)}`"
  >
    <img
      v-show="isFront"
      class="pokemon-sprite"
      :src="sprites.animated?.front ?? sprites.default.front"
      :alt="`Sprite du pokémon ${pokemonName}`"
    />
    <img
      v-show="!isFront"
      class="pokemon-sprite"
      :src="sprites.animated?.back ?? sprites.default.back"
      :alt="`Sprite du pokémon ${pokemonName}`"
    />
  </div>
</template>

<style>
#pokemon-details-sprite {
  align-self: center;
  cursor: pointer;
  width: 100%;
  height: auto;
  aspect-ratio: 384 / 308;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
}

#pokemon-details-sprite .pokemon-sprite {
  image-rendering: pixelated;
  display: block;
  margin: 0;
  background-blend-mode: screen;
  z-index: 1;
  height: calc(50% * var(--pokemonSize));
  min-height: 70px;
  max-height: calc(100% - 25px);
  transform: translateY(-40px);
}

#pokemon-details-sprite::before,
#pokemon-details-sprite::after {
  content: '';
  image-rendering: pixelated;
  position: absolute;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}

#pokemon-details-sprite::before {
  background-image: url('/images/field.png');
  background-position: bottom;
  background-size: 100%;
  border-radius: 5px;
}

#pokemon-details-sprite::after {
  background-image: url('/images/battle_base1.png');
  background-position: bottom 20px center;
  background-size: 90%;
}
</style>
