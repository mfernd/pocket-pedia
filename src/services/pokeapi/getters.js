import * as Utils from '@/services/pokeapi/pokeapiUtils';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemons = async () => {
  const resp = await fetch(`${API_URL}/pokemon?limit=20&offset=0`);
  const pokemons = await resp.json();
  const pokemonsTypes = await getTypes();
  const res = [];

  for (const pokemon of pokemons.results) {
    const pokemonId = pokemon.url
      .replace('https://pokeapi.co/api/v2/pokemon/', '')
      .slice(0, -1);
    const types = [];

    for (const typeName in pokemonsTypes) {
      if (pokemonsTypes.hasOwnProperty(typeName)) {
        const elFound = pokemonsTypes[typeName].find(
          (el) => el.pokemon.name === pokemon.name
        );
        if (elFound) {
          types.push(typeName);
        }
      }
    }

    res.push({
      speciesId: Number(pokemonId),
      name: pokemon.name,
      sprite: Utils.getArtworkUrl(pokemonId),
      types: types,
    });
  }

  return res;
};

export const getTypes = async () => {
  const res = [];

  for (let i = 1; i <= 18; i++) {
    const resp = await fetch(`${API_URL}/type/${i}`);
    const type = await resp.json();
    res[type.name] = type.pokemon;
  }

  return res;
};

export const getPokemonDetails = async (speciesId) => {
  const respPokemon = await fetch(`${API_URL}/pokemon/${speciesId}`);
  const respSpecies = await fetch(`${API_URL}/pokemon-species/${speciesId}`);
  const pok = await respPokemon.json();
  const pokSpecies = await respSpecies.json();

  const pokemonAbilities = [];
  for (const ability of pok.abilities) {
    pokemonAbilities.push({
      id: ability.ability.id,
      name: ability.ability.name,
      isHidden: ability.isHidden,
    });
  }

  return {
    speciesId: Number(pokSpecies.id),

    name: pokSpecies.names.find((el) => el.language.name === 'fr').name,

    description: pokSpecies['flavor_text_entries'].find(
      (el) => el.language.name === 'fr'
    )['flavor_text'],

    sprites: {
      animated: Utils.getAnimatedUrls(pok.id),
      artwork: Utils.getArtworkUrl(pok.id),
      default: Utils.getArtworkUrl(pok.id),
    },

    category: pokSpecies.genera.find((el) => el.language.name === 'fr').genus,

    stats: pok.stats.map((el) => el['base_stat']),

    moves: pok.moves.map((el) => el.move.name),

    abilities: pokemonAbilities.map((el) => el.name),

    types: pok.types.map((el) => el.type.name),

    height: Number(pok.height) / 10,

    weight: Number(pok.weight) / 10,

    isLegendary: pokSpecies['is_legendary'],

    isMythical: pokSpecies['is_mythical'],
  };
};
