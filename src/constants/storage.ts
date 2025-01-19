export const storageKey = {
  TOKEN: 'noid-token',
  USER:'noid-user',
};
export const storage = {
  getToken: () => localStorage.getItem(storageKey.TOKEN),
  setToken: (token: string) => localStorage.setItem(storageKey.TOKEN, token),
  removeToken: () => localStorage.removeItem(storageKey.TOKEN),
  getUser: ()=>localStorage.getItem(storageKey.USER),
  setUser:(user:string)=>localStorage.setItem(storageKey.USER,user),
  removeUser:()=>localStorage.removeItem(storageKey.USER)
};
