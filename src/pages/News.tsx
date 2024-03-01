import React, { useEffect } from 'react';
import NewsFeed from '../components/newsFeed';
import Header from '../components/header/Header';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { fetchArticlesAction } from '../strore/apiAction';
import { resetPage } from '../strore/articles/articles.slices';
import debounce from '../utils/debounce';
import { getFilter, getPage } from '../strore/articles/articles.selectors';

const debouncedUpdateFeed = debounce((dispatch: any) => dispatch(fetchArticlesAction()), 1500);

const News: React.FC = () => {
  const filter = useAppSelector(getFilter);
  const page = useAppSelector(getPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetPage());
    debouncedUpdateFeed(dispatch);
  }, [dispatch, filter])

  useEffect(() => {
    if (page !== 1) {
      dispatch(fetchArticlesAction());
    }
  }, [dispatch, page]);

  return (
    <div>
      <Header />
      <NewsFeed />
    </div>
  )
};

export default News;