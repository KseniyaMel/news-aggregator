import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../data/constants/nameSpace';
import { Nullable } from '../../data/types/Nullable';
import IArticle from '../../data/IArticle';
import IFilter from '../../data/IFilter';
import { fetchArticlesAction } from '../apiAction';
import moment from 'moment';
import sourcesOption from '../../data/constants/sourcesOption';
import getFromLocalStorage from '../../utils/getFromLocalStorage';

export type InitialState = {
  articles: IArticle[];
  categoriesOption: string[];
  filter: IFilter;
  page: number;
  isLoading: boolean;
  hasError: boolean;
}

export const initialFilterState: IFilter = {
  searchValue: undefined,
  beginDate: moment().subtract(1, 'd').format('YYYY-MM-DD'),
  endDate: moment().format('YYYY-MM-DD'),
  sources: getFromLocalStorage('sources') ?? sourcesOption.map((sources)=>sources.value),
  categories: getFromLocalStorage('categories') ?? undefined
};

export const initialState: InitialState = {
  articles: [],
  filter: initialFilterState,
  categoriesOption: [],
  page: 1,
  isLoading: false,
  hasError: false
};

export const articles = createSlice({
  name: NameSpace.Articles,
  initialState,
  reducers: {
    resetFilter: (state) => {
      state.filter = initialFilterState;
    },
    addCategoriesOption: (state, action: PayloadAction<{category: string}>) => {
      state.categoriesOption = [...state.categoriesOption, action.payload.category];
    },
    setSearchValue: (state, action: PayloadAction<{searchValue: Nullable<string>}>) => {
      state.filter.searchValue = action.payload.searchValue ?? undefined;
    },
    setBeginDate: (state, action: PayloadAction<{beginDate: Nullable<string>}>) => {
      state.filter.beginDate = action.payload.beginDate ?? moment().format('YYYY-MM-DD');
    },
    setEndDate: (state, action: PayloadAction<{endDate: Nullable<string>}>) => {
      state.filter.endDate = action.payload.endDate ?? moment().format('YYYY-MM-DD');
    },
    setSources: (state, action: PayloadAction<{sources: Nullable<string[]>}>) => {
      state.filter.sources = action.payload.sources ?? [];
    },
    setCategories: (state, action: PayloadAction<{categories: Nullable<string[]>}>) => {
      state.filter.categories = action.payload.categories ?? undefined;
    },
    increasePage: (state) => {
      state.page = state.page + 1;
    },
    resetPage: (state) => {
      state.page = 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticlesAction.pending, (state)=> {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchArticlesAction.fulfilled, (state, action)=> {
        if(state.page === 1){
          state.articles = action.payload;
        } else {
          state.articles = [...state.articles, ...action.payload];
        }
        
        state.isLoading = false;
      })
      .addCase(fetchArticlesAction.rejected, (state)=> {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});

export const { 
  resetFilter,
  setBeginDate,
  setCategories,
  setEndDate,
  setSearchValue,
  setSources,
  increasePage,
  resetPage,
  addCategoriesOption 
} = articles.actions;

