export const storageKey = {
  TOKEN: 'noid-token',
};
export const storage = {
  getToken: () => localStorage.getItem(storageKey.TOKEN),
  setToken: (token: string) => localStorage.setItem(storageKey.TOKEN, token),
  removeToken: () => localStorage.removeItem(storageKey.TOKEN),
};
