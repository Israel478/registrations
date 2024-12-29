import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coaches: [],
  status: 'idle',
  error: null
};

const coachesSlice = createSlice({
  name: 'coaches',
  initialState,
  reducers: {
    addCoach: (state, action) => {
      state.coaches.push(action.payload);
    },
    updateCoachStatus: (state, action) => {
      const { id, status } = action.payload;
      const coach = state.coaches.find(coach => coach.id === id);
      if (coach) {
        coach.status = status;
      }
    }
  }
});

export const { addCoach, updateCoachStatus } = coachesSlice.actions;
export default coachesSlice.reducer;
