import { API } from '../constants/api';
import { TCheckTicketTemplateParams } from '../constants/types';
import api from './api';

export const ticketTemplateService = {
  getAllTicketTemplates: async () => {
    const response = await api.get(API.TICKET_TEMPLATES.NORM());
    return response.data;
  },
  deleteTicketTemplate: async (id: string) => {
    const response = await api.delete(API.TICKET_TEMPLATES.NORM(id));
    return response.data;
  },
  checkTicketTemplate: async (checkTemplateData: TCheckTicketTemplateParams) => {
    const response = await api.post(API.TICKET_TEMPLATES.CHECK, checkTemplateData);
    return response.data;
  },
  uploadTicketTemplate: async (uploadTemplateData: FormData) => {
    const response = await api.post(API.TICKET_TEMPLATES.UPLOAD, uploadTemplateData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
