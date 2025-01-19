import { RootState } from '../store';

export const selectCurrentTicketType = (state: RootState) => state.ticketTypes.currentTicketType;
export const selectTicketTypes = (state: RootState) => state.ticketTypes.ticketTypes;
