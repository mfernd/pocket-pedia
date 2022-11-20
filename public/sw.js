const URL_TO_CACHE = [
  'https://pokeapi.co/api/v2/',
  // 'https://raw.githubusercontent.com/PokeAPI/sprites/',
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

  return cache;
};

self.addEventListener('install', (event) => {
  event.waitUntil(addRessourcesToCache());
});

self.addEventListener('fetch', (event) => {
  cacheFirst(event.request).then();
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
