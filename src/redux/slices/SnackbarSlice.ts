import { createSlice } from '@reduxjs/toolkit';
import { TSnackbarType } from '../../constants/types';

interface SnackbarState {
  message: string;
  type: TSnackbarType;
  open: boolean;
  duration: number;
}
const initialState: SnackbarState = {
  message: '',
  type: 'info',
  open: false,
  duration: 5000,
};
const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.open = true;
      state.duration = action.payload.duration || 3000;
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
