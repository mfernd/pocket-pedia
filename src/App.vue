<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <router-link class="home-link card bounce" :to="{ name: 'Home' }">
        <img src="/logo.png" alt="Pokect-pedia logo" />
        <h1>PocketPedia</h1>
      </router-link>
    </nav>
  </header>

  <router-view />

  <footer>
    <p>
      ©2022 Pokémon. ©1995 - 2022 Nintendo/Creatures Inc./GAME FREAK inc. TM,
      ®Nintendo.
    </p>
  </footer>
</template>

<style>
.home-link {
  display: flex;
  align-items: center;
  width: min-content;
}

.home-link > h1 {
  display: inline-block;
  margin: 0 10px 0 0;
}
</style>
