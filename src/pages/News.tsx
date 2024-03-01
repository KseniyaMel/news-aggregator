import React, { useEffect } from 'react';
import NewsFeed from '../components/newsFeed';
import Header from '../components/header/Header';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { fetchArticlesAction } from '../strore/apiAction';
import { resetPage } from '../strore/articles/articles.slices';
import debounce from '../utils/debounce';
import { getFilter, getPage } from '../strore/articles/articles.selectors';

const News: React.FC = () => {
  const filter = useAppSelector(getFilter);
  const page = useAppSelector(getPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const updateFeed = () => {
      dispatch(resetPage());
      dispatch(fetchArticlesAction());
    }
    debounce(updateFeed)();
  }, [dispatch, filter])

  useEffect(() => {
    const updateFeed = () => {
      dispatch(fetchArticlesAction());
    }
    updateFeed();
  }, [dispatch, page]);

  return (
    <div>
      <Header />
      <NewsFeed />
    </div>
  )
};

export default News;