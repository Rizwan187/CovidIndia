// src/store/covidReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CovidData } from '../types/CovidDataTypes'; // Update the path to your actual file

// src/store/covidReducer.ts
interface CovidState {
  data: CovidData | null;
  loading: boolean;
  error: string | null;
  selectedState: string | null; // New property to track the selected state
}

const initialState: CovidState = {
  data: null,
  loading: false,
  error: null,
  selectedState: null, // Initialize to null
};


// Create a slice for covid data
const covidSlice = createSlice({
  name: 'covid',
  initialState,
  reducers: {
    fetchCovidDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCovidDataSuccess: (state, action: PayloadAction<CovidData>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchCovidDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedState: (state, action: PayloadAction<string>) => {
      state.selectedState = action.payload; // Set the selected state
    },
  },
});

// Export actions and reducer
export const { fetchCovidDataRequest, fetchCovidDataSuccess, fetchCovidDataFailure, setSelectedState } = covidSlice.actions;
export default covidSlice.reducer;

