import { createAction } from '@reduxjs/toolkit';
import { TEventCreateUpdateParams } from '../../constants/types';

export const eventActions = {
  create: createAction<TEventCreateUpdateParams>('events/CREATE'),
  getList: createAction('events/GET_LIST'),
  update: createAction<TEventCreateUpdateParams>('events/UPDATE'),
  delete: createAction<string>('events/DELETE'),
};
