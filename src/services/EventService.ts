import { API } from '../constants/api';
import { TEventCreateUpdateParams } from '../constants/types';
import api from './api';

export const eventService = {
  getAllEvents: async () => {
    const response = await api.get(API.EVENTS());
    return response.data;
  },
  createEvent: async (eventData: TEventCreateUpdateParams) => {
    const response = await api.post(API.EVENTS(), eventData);
    return response.data;
  },
  updateEvent: async (id: string, eventData: TEventCreateUpdateParams) => {
    const response = await api.put(API.EVENTS(id), eventData);
    return response.data;
  },
  deleteEvent: async (id: string) => {
    const response = await api.delete(API.EVENTS(id));
    return response.data;
  },
};
