import { RootState } from '../store';

export const selectCurrentTemplate = (state: RootState) => state.ticketTemplates.currentTemplate;
