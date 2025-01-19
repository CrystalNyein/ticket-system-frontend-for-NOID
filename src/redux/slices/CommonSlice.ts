import { createSlice } from '@reduxjs/toolkit';

interface CommonState {
  loading: boolean;
}

const initialState: CommonState = {
  loading: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = commonSlice.actions;
export default commonSlice.reducer;
