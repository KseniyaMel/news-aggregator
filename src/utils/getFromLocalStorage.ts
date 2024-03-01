const getFromLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(`Error getting variable ${key} from localStorage:`, error);
    return null;
  }
}

export default getFromLocalStorage;