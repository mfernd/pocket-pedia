const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemonsData = async () => {
  const resp = await fetch(`${API_URL}/pokemon-species?limit=1000&offset=0`);
  return resp.json();
};

export const getPokemonsDataByType = async () => {
  const res = [];

  for (let i = 1; i <= 18; i++) {
    const resp = await fetch(`${API_URL}/type/${i}`);
    const type = await resp.json();
    res[type.name] = type.pokemon;
  }

  return res;
};

export const getPokemonDataById = async (id) => {
  const resp = await fetch(`${API_URL}/pokemon/${id}`);
  return resp.json();
};

export const getPokemonSpeciesDataById = async (id) => {
  const resp = await fetch(`${API_URL}/pokemon-species/${id}`);
  return resp.json();
};
