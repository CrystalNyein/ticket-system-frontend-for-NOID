import { RootState } from '../store';

export const selectTicketTemplates = (state: RootState) => state.ticketTemplates.ticketTemplates;
export const selectCurrentTicketTemplate = (state: RootState) => state.ticketTemplates.currentTicketTemplate;
