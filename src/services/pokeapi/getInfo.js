import * as Utils from '@/services/pokeapi/pokeapiUtils';
import { getPokemonDataById, getPokemonSpeciesDataById } from './fetchData';

export const getDetails = async (speciesId) => {
  const pok = await getPokemonDataById(speciesId);
  const pokSpecies = await getPokemonSpeciesDataById(speciesId);

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

    abilities: pok.abilities.map((el) => el.ability.name),

    types: pok.types.map((el) => el.type.name),

    height: Number(pok.height) / 10,

    weight: Number(pok.weight) / 10,

    isLegendary: pokSpecies['is_legendary'],

    isMythical: pokSpecies['is_mythical'],
  };
};
