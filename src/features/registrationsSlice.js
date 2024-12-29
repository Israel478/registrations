import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registrations: [],
  status: 'idle',
  error: null
};

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    addRegistration: (state, action) => {
      state.registrations.push(action.payload);
    },
    updateRegistrationStatus: (state, action) => {
      const { id, status } = action.payload;
      const registration = state.registrations.find(reg => reg.id === id);
      if (registration) {
        registration.status = status;
      }
    }
  }
});

export const { addRegistration, updateRegistrationStatus } = registrationsSlice.actions;
export default registrationsSlice.reducer;
