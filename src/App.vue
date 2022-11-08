<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <router-link class="home-link" :to="{ name: 'Home' }">
        <h1 class="card bounce">📚 PocketPedia</h1>
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
  display: inline-block;
  height: 100%;
}

.home-link > h1 {
  display: inline-block;
  margin: 0;
}
</style>
