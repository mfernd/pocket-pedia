import HomeView from '@/views/HomeView.vue';
import DetailsView from '@/views/PokemonDetailsView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/pokemon/:id',
      name: 'PokemonDetails',
      component: DetailsView,
    },
  ],
});

export default router;
