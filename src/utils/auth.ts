import { storageKey } from '../constants/storage';

export const isTokenValid = () => {
  const token = localStorage.getItem(storageKey.TOKEN);
  if (!token) return false;
  // Optionally: Check the token expiration if it's a JWT token
  const payload = JSON.parse(atob(token.split('.')[1])); // Decoding JWT payload
  const currentTime = Math.floor(Date.now() / 1000); // Current timestamp in seconds

  return payload.exp > currentTime; // Check if the token is expired
};
