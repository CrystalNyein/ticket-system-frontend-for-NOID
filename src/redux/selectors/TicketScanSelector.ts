import { RootState } from '../store';

export const selectCurrentTicketScan = (state: RootState) => state.ticketScans.currentTicketScan;
