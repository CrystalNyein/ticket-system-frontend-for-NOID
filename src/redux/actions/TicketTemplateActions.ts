import { createAction } from '@reduxjs/toolkit';
import { TCheckTemplateParams } from '../../constants/types';

export const ticketTemplateActions = {
  checkTemplate: createAction<TCheckTemplateParams>('ticketTemplates/CHECK_TEMPLATE'),
};
