const URL_TO_CACHE = [
  'https://pokeapi.co/api/v2/',
  // 'https://raw.githubusercontent.com/PokeAPI/sprites/',
];

const TYPES = [
  '/images/types/bug.png',
  '/images/types/dark.png',
  '/images/types/dragon.png',
  '/images/types/electric.png',
  '/images/types/fairy.png',
  '/images/types/fighting.png',
  '/images/types/fire.png',
  '/images/types/flying.png',
  '/images/types/ghost.png',
  '/images/types/grass.png',
  '/images/types/ground.png',
  '/images/types/ice.png',
  '/images/types/normal.png',
  '/images/types/poison.png',
  '/images/types/psychic.png',
  '/images/types/rock.png',
  '/images/types/steel.png',
  '/images/types/water.png',
];

const CACHE_NAME = 'pocket-pedia-v1';

const addRessourcesToCache = async () => {
  const cache = await caches.open(CACHE_NAME);

  await cache.addAll([
    '/translations/en.json',
    '/translations/fr.json',
    '/translations/jp.json',
    '/images/battle_base1.png',
    '/images/field.png',
    '/images/loading.gif',
    '/images/logo.png',
    '/images/translation.svg',
  ]);

  await cache.addAll(TYPES);

  return cache;
};

self.addEventListener('install', (event) => {
  event.waitUntil(addRessourcesToCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(cacheFirst(event.request));
});

const cacheFirst = async (request) => {
  // If we have it, we return the resource from cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) return responseFromCache;

  // If not, we fetch it from network
  const responseFromNetwork = await fetch(request);
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
};

const putInCache = async (request, response) => {
  for (const urlToCache of URL_TO_CACHE) {
    if (!request.url.startsWith(urlToCache)) continue;

    // console.log(`caching: ${request.url}`);
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response);
  }
};
