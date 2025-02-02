import { createSlice } from '@reduxjs/toolkit';
import { TTicketTemplate } from '../../constants/types';

interface TicketTemplateState {
  ticketTemplates: TTicketTemplate[];
  currentTicketTemplate: TTicketTemplate | null;
}
const initialState: TicketTemplateState = {
  ticketTemplates: [],
  currentTicketTemplate: null,
};
const ticketTemplateSlice = createSlice({
  name: 'ticketTemplates',
  initialState,
  reducers: {
    getTicketTemplatesSuccess(state, action) {
      state.ticketTemplates = action.payload;
    },
    deleteTicketTemplateSuccess(state, action) {
      state.ticketTemplates = state.ticketTemplates.filter((ticketTemplate) => ticketTemplate.id !== action.payload);
    },
    setCurrentTicketTemplate(state, action) {
      state.currentTicketTemplate = action.payload;
    },
  },
});

export const { getTicketTemplatesSuccess, deleteTicketTemplateSuccess, setCurrentTicketTemplate } = ticketTemplateSlice.actions;
export default ticketTemplateSlice.reducer;
