import * as Utils from '@/services/pokeapi/pokeapiUtils';
import { getPokemonsData, getPokemonsDataByType } from './fetchData';

export const getList = async () => {
  const pokemons = await getPokemonsData();
  const pokemonsTypes = await getPokemonsDataByType();
  const res = [];

  for (const pokemon of pokemons.results) {
    const pokemonId = pokemon.url
      .replace('https://pokeapi.co/api/v2/pokemon-species/', '')
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
