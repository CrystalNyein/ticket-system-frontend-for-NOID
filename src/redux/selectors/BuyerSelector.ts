import { RootState } from '../store';

export const selectCurrentBuyer = (state: RootState) => state.buyers.currentBuyer;
