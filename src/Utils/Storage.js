const storagePrefix = "things__";

export const storage = {
  getToken: () => {
    return JSON.parse(localStorage.getItem(`${storagePrefix}token`));
  },
  setToken: (accessToken) => {
    localStorage.setItem(`${storagePrefix}token`, JSON.stringify(accessToken));
  },
  clearToken: () => {
    localStorage.removeItem(`${storagePrefix}token`);
  },
};
