import * as Utils from '@/services/pokeapi/pokeapiUtils';
import { getCurrentLang, getPokemonTypes } from '@/services/translator';

const API_URL = 'https://pokeapi.co/api/v2';

export const getDetails = async (id) => {
  const pok = await getPokemonDataById(id);
  const pokSpecies = await getPokemonSpeciesDataById(id);
  const types = getPokemonTypes();

  let currentLang = getCurrentLang();
  if (currentLang === 'jp') {
    currentLang = 'ja';
  }

  let description = pokSpecies['flavor_text_entries'].find(
    (el) => el.language.name === currentLang
  );
  if (!description) {
    description = pokSpecies['flavor_text_entries'].find(
      (el) => el.language.name === 'en'
    );
  }

  let evolutionChainId = pokSpecies['evolution_chain'];
  if (null !== evolutionChainId) {
    evolutionChainId = evolutionChainId.url.split('/')[6];
  }

  return {
    id: Number(pokSpecies.id),

    name: pokSpecies.names.find((el) => el.language.name === currentLang).name,

    description: description['flavor_text'],

    sprites: {
      animated: Utils.getAnimatedUrls(pok.id),
      artwork: Utils.getArtworkUrl(pok.id),
      default: Utils.getDefaultUrls(pok.id),
    },

    category: pokSpecies.genera.find((el) => el.language.name === currentLang)
      .genus,

    stats: pok.stats.map((el) => el['base_stat']),

    moves: pok.moves.map((el) => el.move.name),

    abilities: pok.abilities.map((el) => el.ability.name),

    types: pok.types.map((el) => ({
      name: types[el.type.name],
      class: el.type.name,
    })),

    height: Number(pok.height) / 10,

    weight: Number(pok.weight) / 10,

    isLegendary: pokSpecies['is_legendary'],

    isMythical: pokSpecies['is_mythical'],

    evolutionChainId: Number(evolutionChainId),
  };
};

const getPokemonDataById = async (id) => {
  const resp = await fetch(`${API_URL}/pokemon/${id}`);
  return resp.json();
};

const getPokemonSpeciesDataById = async (id) => {
  const resp = await fetch(`${API_URL}/pokemon-species/${id}`);
  return resp.json();
};
