import { createAction } from '@reduxjs/toolkit';
import { TLoginForm } from '../../constants/types';

export const authActions = {
  login: createAction<TLoginForm>('auth/LOGIN'),
  logout: createAction('auth/LOGOUT'),
  // getMe: createAction('auth/GET_ME'),
};
