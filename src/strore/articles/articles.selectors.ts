import IFilter from "../../data/IFilter";
import IArticle from "../../data/IArticle";
import { NameSpace } from "../../data/constants/nameSpace";
import { State } from '../../data/types/store';

export const getSearchValue = (state: State): string | undefined => state[NameSpace.Articles].filter.searchValue;
export const getBeginDate = (state: State): string | undefined => state[NameSpace.Articles].filter.beginDate;
export const getEndDate = (state: State): string | undefined => state[NameSpace.Articles].filter.endDate;
export const getSources = (state: State): string[] | undefined => state[NameSpace.Articles].filter.sources;
export const getCategories = (state: State): string[] | undefined => state[NameSpace.Articles].filter.categories;
export const getFilter = (state: State): IFilter => state[NameSpace.Articles].filter;
export const getCategoriesOption  = (state: State): string[] => state[NameSpace.Articles].categoriesOption;

export const getArticles = (state: State): IArticle[] => state[NameSpace.Articles].articles;
export const getPage = (state: State): number => state[NameSpace.Articles].page;
export const getIsLoading = (state: State): boolean => state[NameSpace.Articles].isLoading;
export const getHasError = (state: State): boolean => state[NameSpace.Articles].hasError;

