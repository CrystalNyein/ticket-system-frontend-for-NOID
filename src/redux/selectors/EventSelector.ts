import { RootState } from '../store';

export const selectCurrentEvent = (state: RootState) => state.events.currentEvent;
export const selectEvents = (state: RootState) => state.events.events;
export const selectRecentEvent = (state: RootState) => state.events.recentEvent;
