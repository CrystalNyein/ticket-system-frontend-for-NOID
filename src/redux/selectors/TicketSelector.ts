import { RootState } from '../store';

export const selectCurrentTicket = (state: RootState) => state.tickets.currentTicket;
export const selectTickets = (state: RootState) => state.tickets.tickets;
export const selectEventTicketStat = (state: RootState) => state.tickets.eventTicketStat;
export const selectTotalTicketStat = (state: RootState) => state.tickets.totalTicketStat;
export const selectTicketSummary = (state: RootState) => state.tickets.ticketSummary;
