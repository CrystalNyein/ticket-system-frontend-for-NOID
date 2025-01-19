import { RootState } from '../store';

export const selectCurrentEvent = (state: RootState) => state.events.currentEvent;
export const selectEvents = (state: RootState) => state.events.events;
