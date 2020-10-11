export function debounce(mainFunction, delay) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      mainFunction(...args);
    }, delay);
  };
}
