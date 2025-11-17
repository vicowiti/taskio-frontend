export const clearStorage = async () => {
  await localStorage.clear();
};

export const storeData = async (key: string, value: object) => {
  try {
    await localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await localStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.log(error);
  }
};
