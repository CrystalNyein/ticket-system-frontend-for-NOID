import { createAction } from '@reduxjs/toolkit';
import { TUserCreateUpdateParams } from '../../constants/types';

export const userActions = {
  getMe: createAction('users/GET_ME'),
  create: createAction<TUserCreateUpdateParams>('users/CREATE'),
  getList: createAction('users/GET_LIST'),
  update: createAction<TUserCreateUpdateParams>('users/UPDATE'),
  delete: createAction<string>('users/DELETE'),
};
