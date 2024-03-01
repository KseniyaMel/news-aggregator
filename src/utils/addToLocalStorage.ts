const addToLocalStorage = (key: string, value: string | string[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error adding variable ${key} to localStorage:`, error);
  }
};

export default addToLocalStorage;