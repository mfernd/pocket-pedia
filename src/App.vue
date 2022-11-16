<script setup>
import { RouterLink, RouterView } from 'vue-router';
import SelectLanguage from './components/SelectLanguage.vue';
</script>

<template>
  <header>
    <nav>
      <router-link class="home-link card bounce" :to="{ name: 'Home' }">
        <img src="/images/logo.png" alt="Pokect-pedia logo" />
        <h1>PocketPedia</h1>
      </router-link>

      <SelectLanguage />
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
nav {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
}

@media only screen and (max-width: 1280px) {
  nav {
    justify-content: space-between;
    width: 100%;
    max-width: 752px;
  }
}

.home-link {
  display: flex;
  align-items: center;
  width: min-content;
  gap: 10px;
}

.home-link > h1 {
  display: inline-block;
  margin: 0 10px 0 0;
}
</style>
