import { createSlice } from '@reduxjs/toolkit';
import { TTicketTemplate } from '../../constants/types';

interface TicketTemplateState {
  currentTemplate: TTicketTemplate | null;
}
const initialState: TicketTemplateState = {
  currentTemplate: null,
};
const ticketTemplateSlice = createSlice({
  name: 'ticketTemplates',
  initialState,
  reducers: {
    setCurrentTemplate(state, action) {
      state.currentTemplate = action.payload;
    },
  },
});

export const { setCurrentTemplate } = ticketTemplateSlice.actions;
export default ticketTemplateSlice.reducer;
