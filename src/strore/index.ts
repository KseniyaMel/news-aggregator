import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import Api from '../services/api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: {
      extraArgument: new Api(),
    }})
});