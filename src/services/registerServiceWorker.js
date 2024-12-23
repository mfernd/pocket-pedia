export const registerServiceWorker = async () => {
  if (navigator?.serviceWorker) {
    try {
      navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};
