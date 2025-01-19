import { API } from '../constants/api';
import { TTicketCreateParams, TTicketUpdateParams } from '../constants/types';
import api from './api';

export const ticketService = {
  getAllTickets: async () => {
    const response = await api.get(API.TICKETS.NORM());
    return response.data;
  },
  createTicket: async (ticketData: TTicketCreateParams) => {
    const response = await api.post(API.TICKETS.NORM(), ticketData);
    return response.data;
  },
  bulkCreateTicket: async (ticketData: TTicketCreateParams) => {
    const response = await api.post(API.TICKETS.BULK, ticketData);
    return response.data;
  },
  updateTicket: async (id: string, ticketData: TTicketUpdateParams) => {
    const response = await api.put(API.TICKETS.NORM(id), ticketData);
    return response.data;
  },
  deleteTicket: async (id: string) => {
    const response = await api.delete(API.TICKETS.NORM(id));
    return response.data;
  },
  importTicketSales: async (saleData: FormData) => {
    const response = await api.post(API.TICKETS.IMPORT_SALE, saleData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  scanTicket: async (qrData: string) => {
    const response = await api.post(API.TICKETS.SCAN, { qrData });
    return response.data;
  },
};
