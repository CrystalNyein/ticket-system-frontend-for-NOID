import { createSlice } from '@reduxjs/toolkit';
import { TTicketScan } from '../../constants/types';

interface TicketScanState {
  currentTicketScan: TTicketScan | null;
}
const initialState: TicketScanState = {
  currentTicketScan: null,
};

const ticketScanSlice = createSlice({
  name: 'ticketScans',
  initialState,
  reducers: {
    setCurrentTicketScan(state, action) {
      state.currentTicketScan = action.payload;
    },
  },
});

export const { setCurrentTicketScan } = ticketScanSlice.actions;
export default ticketScanSlice.reducer;
