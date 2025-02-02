import { createAction } from '@reduxjs/toolkit';
import { TCheckTicketTemplateParams } from '../../constants/types';

export const ticketTemplateActions = {
  checkTemplate: createAction<TCheckTicketTemplateParams>('ticketTemplates/CHECK_TEMPLATE'),
  getList: createAction('ticketTemplates/GET_LIST'),
  delete: createAction<string>('ticketTemplates/DELETE'),
};
