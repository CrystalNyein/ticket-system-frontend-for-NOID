import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TEvent } from '../../constants/types';
import { normalizeDate } from '../../utils/dateUtils';

interface EventState {
  events: TEvent[];
  futureEvents: TEvent[];
  currentEvent: TEvent | null;
  recentEvent: TEvent | null;
}
const initialState: EventState = {
  events: [],
  futureEvents: [],
  currentEvent: null,
  recentEvent: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setCurrentEvent(state, action: PayloadAction<TEvent | null>) {
      state.currentEvent = action.payload;
    },
    getEventsSuccess(state, action) {
      state.events = action.payload;
      state.futureEvents = action.payload.filter((event: TEvent) => new Date(event.endDate!) > normalizeDate(new Date()));
    },
    createEventSuccess(state, action) {
      state.events.push(action.payload);
      state.futureEvents.push(action.payload);
    },
    updateEventSuccess(state, action) {
      const index = state.events.findIndex((event) => event.id == action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
      const futureIndex = state.futureEvents.findIndex((event) => event.id == action.payload.id);
      if (futureIndex !== -1) {
        state.futureEvents[futureIndex] = action.payload;
      }
    },
    deleteEventSuccess(state, action) {
      state.events = state.events.filter((event) => event.id !== action.payload);
      state.futureEvents = state.futureEvents.filter((event) => event.id !== action.payload);
    },
    setRecentEvent(state, action: PayloadAction<TEvent | null>) {
      state.recentEvent = action.payload;
    },
  },
});

export const { setCurrentEvent, getEventsSuccess, createEventSuccess, updateEventSuccess, deleteEventSuccess, setRecentEvent } = eventSlice.actions;
export default eventSlice.reducer;
