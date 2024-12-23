const BASE_URL = import.meta.env.BASE_URL;

export const registerServiceWorker = async () => {
  if (navigator?.serviceWorker) {
    try {
      navigator.serviceWorker.register(`${BASE_URL}/sw.js`);
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};
