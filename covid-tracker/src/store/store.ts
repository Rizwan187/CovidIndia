// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import covidReducer from './covidReducer';

const store = configureStore({
  reducer: {
    covid: covidReducer, // Combine your reducers here
  },
});

export default store;
