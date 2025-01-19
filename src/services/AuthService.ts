import { AxiosResponse } from 'axios';
import { storage } from '../constants/storage';
import { TLoginForm } from '../constants/types';
import api from './api';
import { API } from '../constants/api';

export const authService = {
  login: async (loginData: TLoginForm): Promise<AxiosResponse<null>> => {
    const { data } = await api.post(API.AUTH.LOGIN, loginData);
    return data;
  },
  logout: () => {
    // Remove the token from localStorage
    storage.removeToken();
  },
};
