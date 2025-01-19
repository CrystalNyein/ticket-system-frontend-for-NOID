import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../constants/types';

interface AuthState {
  users: TUser[];
  currentUser: TUser | null;
}

const initialState: AuthState = {
  users: [],
  currentUser: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<TUser | null>) {
      state.currentUser = action.payload;
    },
    getUsersSuccess: (state, action: PayloadAction<TUser[]>) => {
      state.users = action.payload;
    },
    createUserSuccess(state, action) {
      state.users.push(action.payload);
    },
    updateUserSuccess(state, action) {
      const index = state.users.findIndex((user) => user.id == action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUserSuccess(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});
export const { setCurrentUser, getUsersSuccess, createUserSuccess, updateUserSuccess, deleteUserSuccess } = userSlice.actions;
export default userSlice.reducer;
