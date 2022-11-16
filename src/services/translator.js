const KEY_NAME = 'currentLang';
const LANGS = ['fr', 'en', 'jp'];

export let tr = null;

export const setupTranslator = async () => {
  if (!localStorage.getItem(KEY_NAME)) {
    localStorage.setItem(KEY_NAME, LANGS[0]);
  }

  tr = await getTranslations();
};

export const changeLanguage = async (lang) => {
  if (!LANGS.includes(lang)) {
    return;
  }

  localStorage.setItem(KEY_NAME, lang);
  tr = await getTranslations();
};

const getTranslations = async () => {
  const currentLang = localStorage.getItem(KEY_NAME) ?? LANGS[0];
  const respTranslations = await fetch(`/translations/${currentLang}.json`);
  return respTranslations.json();
};

export const getPokemonNames = () => {
  return tr.pokemonNames;
};

export const getPokemonTypes = () => {
  return tr.pokemonTypes;
};
