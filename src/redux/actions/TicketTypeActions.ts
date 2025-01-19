import { createAction } from '@reduxjs/toolkit';
import { TTicketTypeCreateUpdateParams } from '../../constants/types';

export const ticketTypeActions = {
  create: createAction<TTicketTypeCreateUpdateParams>('ticketTypes/CREATE'),
  getList: createAction('ticketTypes/GET_LIST'),
  update: createAction<TTicketTypeCreateUpdateParams>('ticketTypes/UPDATE'),
  delete: createAction<string>('ticketTypes/DELETE'),
};
