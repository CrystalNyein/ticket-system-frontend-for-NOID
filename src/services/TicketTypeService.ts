import { API } from '../constants/api';
import { TTicketTypeCreateUpdateParams } from '../constants/types';
import api from './api';

export const ticketTypeService = {
  getAllTicketTypes: async () => {
    const response = await api.get(API.TICKET_TYPES());
    return response.data;
  },
  createTicketType: async (ticketTypeData: TTicketTypeCreateUpdateParams) => {
    const response = await api.post(API.TICKET_TYPES(), ticketTypeData);
    return response.data;
  },
  updateTicketType: async (id: string, ticketTypeData: TTicketTypeCreateUpdateParams) => {
    const response = await api.put(API.TICKET_TYPES(id), ticketTypeData);
    return response.data;
  },
  deleteTicketType: async (id: string) => {
    const response = await api.delete(API.TICKET_TYPES(id));
    return response.data;
  },
};
