import { API } from '../constants/api';
import { TCheckTemplateParams } from '../constants/types';
import api from './api';

export const ticketTemplateService = {
  checkTemplate: async (checkTemplateData: TCheckTemplateParams) => {
    const response = await api.post(API.TICKET_TEMPLATES.CHECK, checkTemplateData);
    return response.data;
  },
  uploadTemplate: async (uploadTemplateData: FormData) => {
    const response = await api.post(API.TICKET_TEMPLATES.UPLOAD, uploadTemplateData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
