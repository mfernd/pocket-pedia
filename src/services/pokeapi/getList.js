import * as Utils from '@/services/pokeapi/pokeapiUtils';
import { getPokemonNames, getPokemonTypes } from '@/services/translator';

// Get list of all pokemons with pokemon(id, name, sprite, types)
export const getList = async () => {
  const pokemons = getPokemonNames();
  const pokemonsTypes = await getPokemonsDataByType();
  const typesTranslated = getPokemonTypes();
  const res = [];

  for (const pokemon of pokemons) {
    const types = [];

    for (const typeName in pokemonsTypes) {
      if (!pokemonsTypes.hasOwnProperty(typeName)) continue;
      const elFound = pokemonsTypes[typeName].find(
        (el) => Number(el.id) === Number(pokemon.id)
      );
      if (!elFound) continue;

      types.push({
        class: typeName,
        name: typesTranslated[typeName],
      });
    }

    res.push({
      id: Number(pokemon.id),
      name: pokemon.name,
      sprite: Utils.getArtworkUrl(pokemon.id),
      types: types,
    });
  }

  return res;
};

// Filter pokemon array according to a query (name or id)
export const filterPokemonsByQuery = (data, query) => {
  if (query === undefined || query === null || query === '') {
    return data;
  }

  return data.filter((pokemon) => {
    const pokemonId = String(pokemon.id).startsWith(String(query));
    const pokemonName = pokemon.name
      .toLowerCase()
      .startsWith(query.toLowerCase());

    return pokemonId || pokemonName;
  });
};

// Fetch all 18 types with all their pokemons
const API_URL = 'https://pokeapi.co/api/v2';
const getPokemonsDataByType = async () => {
  const res = [];

  for (let i = 1; i <= 18; i++) {
    const resp = await fetch(`${API_URL}/type/${i}`);
    const type = await resp.json();

    res[type.name] = type.pokemon.map((el) => {
      return {
        id: el.pokemon.url
          .replace('https://pokeapi.co/api/v2/pokemon/', '')
          .slice(0, -1),
        name: el.pokemon.name,
      };
    });
  }

  return res;
};
