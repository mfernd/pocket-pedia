import { getPokemonNames } from '@/services/translator';
import * as Utils from '@/services/pokeapi/pokeapiUtils';

const API_URL = 'https://pokeapi.co/api/v2';

export const getEvolutionChain = async (id) => {
  const evolutionChain = await getEvolutionChainData(id);
  const evolutions = getEvolutions(evolutionChain.chain);

  return evolutions;
};

const getEvolutionChainData = async (id) => {
  const resp = await fetch(`${API_URL}/evolution-chain/${id}`);
  return resp.json();
};

const getEvolutions = (chain) => {
  const res = [];

  // First pokemon of the chain
  res.push(extractPokemon(chain));

  // Iterate through branches
  // (a pokemon has at most 2 more evolution)
  for (const branch of chain['evolves_to']) {
    res.push(extractPokemon(branch));

    if (branch['evolves_to'].length <= 0) continue;

    for (const subBranch of branch['evolves_to']) {
      res.push(extractPokemon(subBranch));
    }
  }

  return res;
};

const extractPokemon = (obj) => {
  const pokemons = getPokemonNames();
  const id = obj.species.url.split('/')[6];

  return {
    id: Number(id),
    name: pokemons.find((el) => el.id === Number(id)).name,
    sprites: {
      animated: Utils.getAnimatedUrls(id),
      default: Utils.getDefaultUrls(id),
    },
  };
};
