import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer'; 

const store = configureStore({
  reducer: {
    data: reducer, 
  },
});

export default store;
