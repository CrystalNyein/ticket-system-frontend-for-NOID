import { API } from '../constants/api';
import { TUserCreateUpdateParams } from '../constants/types';
import api from './api';

export const userService = {
  getMe: async () => {
    const response = await api.get(API.USERS.ME);
    return response.data;
  },
  getAllUsers: async () => {
    const response = await api.get(API.USERS.NORM());
    return response.data;
  },
  createUser: async (userData: TUserCreateUpdateParams) => {
    const response = await api.post(API.USERS.NORM(), userData);
    return response.data;
  },
  updateUser: async (id: string, userData: TUserCreateUpdateParams) => {
    const response = await api.put(API.USERS.NORM(id), userData);
    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await api.delete(API.USERS.NORM(id));
    return response.data;
  },
};
