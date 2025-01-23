import { createAction } from '@reduxjs/toolkit';
import { TTicketCreateParams, TTicketStatByDateParams, TTicketStatByEventParams, TTicketUpdateParams } from '../../constants/types';

export const ticketActions = {
  create: createAction<TTicketCreateParams>('tickets/CREATE'),
  bulkCreate: createAction<TTicketCreateParams>('tickets/BULK_CREATE'),
  getList: createAction('tickets/GET_LIST'),
  getDetails: createAction<string>('tickets/GET_DETAIL'),
  getStatsByDate: createAction<TTicketStatByDateParams>('tickets/GET_STATS_BY_DATE'),
  getStatsByEvent: createAction<TTicketStatByEventParams>('tickets/GET_STATS_BY_EVENT'),
  update: createAction<TTicketUpdateParams>('tickets/UPDATE'),
  delete: createAction<string>('tickets/DELETE'),
  scan: createAction<string>('tickets/SCAN'),
};
