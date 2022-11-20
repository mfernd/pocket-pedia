const SPRITE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites';

export const getArtworkUrl = (speciesId) => {
  return `${SPRITE_URL}/pokemon/other/official-artwork/${speciesId}.png`;
};

export const getAnimatedUrls = (speciesId) => {
  if (0 < speciesId && speciesId < 650) {
    return {
      back: `${SPRITE_URL}/pokemon/versions/generation-v/black-white/animated/back/${speciesId}.gif`,
      front: `${SPRITE_URL}/pokemon/versions/generation-v/black-white/animated/${speciesId}.gif`,
    };
  }
  return null;
};

export const getDefaultUrls = (speciesId) => {
  if (speciesId > 898) {
    return {
      back: null,
      front: `${SPRITE_URL}/pokemon/${speciesId}.png`,
    };
  }

  return {
    back: `${SPRITE_URL}/pokemon/back/${speciesId}.png`,
    front: `${SPRITE_URL}/pokemon/${speciesId}.png`,
  };
};
