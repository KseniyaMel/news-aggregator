import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../data/types/store';
import IArticle from '../data/IArticle';
import Api from '../services/api';


export const fetchArticlesAction = createAsyncThunk<
  IArticle[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: Api;
  }>(
    'articles/loadArticles',
    async (_arg, {extra: api, getState}) => {
      const { articles: stateArticles } = getState();
      const { filter, page } = stateArticles;
      let articles: IArticle[] = [];
  
      if (filter.sources.includes('abc-news') && (!filter.categories || filter.categories.length === 0)) {
        const newsArticles = await api.getNewsArticles(filter, page);
        articles.push(...newsArticles);
      }
  
      if (filter.sources.includes('guardian')) {
        const guardianArticles = await api.getGuardianArticles(filter, page);
        articles.push(...guardianArticles);
      }
  
      if (filter.sources.includes('new-york-times')) {
        const newYorkTimesArticles = await api.getNewYorkTimesArticles(filter, page);
        articles.push(...newYorkTimesArticles);
      }
  
      return articles;
    },
  );