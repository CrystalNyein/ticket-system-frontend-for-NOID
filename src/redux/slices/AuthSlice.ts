import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../constants/types';

interface AuthState {
  user: TUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<TUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
