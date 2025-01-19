import { createSlice } from '@reduxjs/toolkit';
import { TBuyer } from '../../constants/types';

interface BuyerState {
  currentBuyer: TBuyer | null;
}
const initialState: BuyerState = {
  currentBuyer: null,
};
const buyerSlice = createSlice({
  name: 'buyers',
  initialState,
  reducers: {
    setCurrentBuyer(state, action) {
      state.currentBuyer = action.payload;
    },
  },
});
export const { setCurrentBuyer } = buyerSlice.actions;
export default buyerSlice.reducer;
