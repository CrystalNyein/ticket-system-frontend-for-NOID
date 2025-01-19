import { createSlice } from '@reduxjs/toolkit';
import { TTicket } from '../../constants/types';

interface TicketState {
  tickets: TTicket[];
  currentTicket: TTicket | null;
}
const initialState: TicketState = {
  tickets: [],
  currentTicket: null,
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setCurrentTicket(state, action) {
      state.currentTicket = action.payload;
    },
    getTicketsSuccess(state, action) {
      state.tickets = action.payload;
    },
    createTicketSuccess(state, action) {
      state.tickets.push(action.payload);
    },
    bulkCreateTicketSuccess(state, action) {
      state.tickets.push(action.payload);
    },
    updateTicketSuccess(state, action) {
      const index = state.tickets.findIndex((ticket) => ticket.id == action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
    deleteTicketSuccess(state, action) {
      state.tickets = state.tickets.filter((ticket) => ticket.id !== action.payload);
    },
  },
});

export const { setCurrentTicket, getTicketsSuccess, createTicketSuccess, updateTicketSuccess, deleteTicketSuccess } = ticketSlice.actions;
export default ticketSlice.reducer;
