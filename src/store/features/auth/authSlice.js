import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  users: [],
  currentUser: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setUser: (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { setLoading, setError, setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
