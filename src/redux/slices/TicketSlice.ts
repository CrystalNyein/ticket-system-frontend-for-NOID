import { createSlice } from '@reduxjs/toolkit';
import { TTicket, TTicketStat } from '../../constants/types';

interface TicketState {
  tickets: TTicket[];
  currentTicket: TTicket | null;
  eventTicketStat: TTicketStat;
  totalTicketStat: TTicketStat;
}
const initialState: TicketState = {
  tickets: [],
  currentTicket: null,
  eventTicketStat: {
    ticketCount: 0,
    soldTicketCount: 0,
  },
  totalTicketStat: {
    ticketCount: 0,
    soldTicketCount: 0,
  },
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
    setEventTicketStat(state, action) {
      state.eventTicketStat = action.payload;
    },
    setTotalTicketStat(state, action) {
      state.totalTicketStat = action.payload;
    },
  },
});

export const { setCurrentTicket, getTicketsSuccess, createTicketSuccess, updateTicketSuccess, deleteTicketSuccess, setEventTicketStat, setTotalTicketStat } = ticketSlice.actions;
export default ticketSlice.reducer;
