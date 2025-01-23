import { API } from '../constants/api';
import { TEventCreateUpdateParams } from '../constants/types';
import api from './api';

export const eventService = {
  getAllEvents: async () => {
    const response = await api.get(API.EVENTS.NORM());
    return response.data;
  },
  createEvent: async (eventData: TEventCreateUpdateParams) => {
    const response = await api.post(API.EVENTS.NORM(), eventData);
    return response.data;
  },
  updateEvent: async (id: string, eventData: TEventCreateUpdateParams) => {
    const response = await api.put(API.EVENTS.NORM(id), eventData);
    return response.data;
  },
  deleteEvent: async (id: string) => {
    const response = await api.delete(API.EVENTS.NORM(id));
    return response.data;
  },
  getRecentEventStats: async () => {
    const response = await api.get(API.EVENTS.RECENT_STATS);
    return response.data;
  },
};
