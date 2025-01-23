import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TEvent } from '../../constants/types';

interface EventState {
  events: TEvent[];
  currentEvent: TEvent | null;
  recentEvent: TEvent | null;
}
const initialState: EventState = {
  events: [],
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
    },
    createEventSuccess(state, action) {
      state.events.push(action.payload);
    },
    updateEventSuccess(state, action) {
      const index = state.events.findIndex((event) => event.id == action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEventSuccess(state, action) {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
    setRecentEvent(state, action: PayloadAction<TEvent | null>) {
      state.recentEvent = action.payload;
    },
  },
});

export const { setCurrentEvent, getEventsSuccess, createEventSuccess, updateEventSuccess, deleteEventSuccess, setRecentEvent } = eventSlice.actions;
export default eventSlice.reducer;
