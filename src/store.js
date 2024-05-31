import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { authReducer } from './authreducer';
import { ProductReducer } from './ProductReducer';

const store = configureStore({
  reducer: {
    authReducer,
    ProductReducer,
  }
});

export default store;