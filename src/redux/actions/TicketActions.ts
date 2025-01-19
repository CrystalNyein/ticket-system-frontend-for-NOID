import { createAction } from '@reduxjs/toolkit';
import { TTicketCreateParams, TTicketUpdateParams } from '../../constants/types';

export const ticketActions = {
  create: createAction<TTicketCreateParams>('tickets/CREATE'),
  bulkCreate: createAction<TTicketCreateParams>('tickets/BULK_CREATE'),
  getList: createAction('tickets/GET_LIST'),
  update: createAction<TTicketUpdateParams>('tickets/UPDATE'),
  delete: createAction<string>('tickets/DELETE'),
  scan: createAction<string>('tickets/SCAN'),
};
