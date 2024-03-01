import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../data/constants/nameSpace';
import { articles } from './articles/articles.slices';

export const rootReducer = combineReducers({
  [NameSpace.Articles]: articles.reducer
});
