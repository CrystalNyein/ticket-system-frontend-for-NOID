import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTicketType } from '../../constants/types';

interface TicketTypeState {
  ticketTypes: TTicketType[];
  currentTicketType: TTicketType | null;
}
const initialState: TicketTypeState = {
  ticketTypes: [],
  currentTicketType: null,
};

const ticketTypeSlice = createSlice({
  name: 'ticketTypes',
  initialState,
  reducers: {
    setCurrentTicketType(state, action: PayloadAction<TTicketType | null>) {
      state.currentTicketType = action.payload;
    },
    getTicketTypesSuccess(state, action) {
      state.ticketTypes = action.payload;
    },
    createTicketTypeSuccess(state, action) {
      state.ticketTypes.push(action.payload);
    },
    updateTicketTypeSuccess(state, action) {
      const index = state.ticketTypes.findIndex((ticketType) => ticketType.id == action.payload.id);
      if (index !== -1) {
        state.ticketTypes[index] = action.payload;
      }
    },
    deleteTicketTypeSuccess(state, action) {
      state.ticketTypes = state.ticketTypes.filter((ticketType) => ticketType.id !== action.payload);
    },
  },
});

export const { setCurrentTicketType, getTicketTypesSuccess, createTicketTypeSuccess, updateTicketTypeSuccess, deleteTicketTypeSuccess } = ticketTypeSlice.actions;
export default ticketTypeSlice.reducer;
