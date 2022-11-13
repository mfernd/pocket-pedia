export const registerServiceWorker = async () => {
  if (navigator && navigator.serviceWorker) {
    window.addEventListener('load', () => {
      try {
        navigator.serviceWorker.register('/sw.js');
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    });
  }
};
