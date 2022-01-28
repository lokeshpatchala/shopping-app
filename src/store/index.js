import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './loginstate-slice';
const store = configureStore({
    reducer: { authState:authenticationSlice.reducer },
  });

  export default store;