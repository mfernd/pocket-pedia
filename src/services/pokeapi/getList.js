import * as Utils from '@/services/pokeapi/pokeapiUtils';
import { getPokemonsDataByType } from './fetchData';
import { getPokemonNames } from '@/services/translator';

export const getList = async () => {
  const pokemons = getPokemonNames();
  const pokemonsTypes = await getPokemonsDataByType();
  const res = [];

  for (const pokemon of pokemons) {
    const types = [];

    for (const typeName in pokemonsTypes) {
      if (pokemonsTypes.hasOwnProperty(typeName)) {
        const elFound = pokemonsTypes[typeName].find(
          (el) => Number(el.id) === Number(pokemon.id)
        );
        if (elFound) {
          types.push(typeName);
        }
      }
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

export const search = (data, query) => {
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
