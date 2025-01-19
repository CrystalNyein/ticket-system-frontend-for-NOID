import { RootState } from '../store';

export const selectCurrentTicket = (state: RootState) => state.tickets.currentTicket;
export const selectTickets = (state: RootState) => state.tickets.tickets;
