import React from 'react';
import Article from '../article';
import styles from './NewsFeed.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { getArticles, getIsLoading } from '../../strore/articles/articles.selectors';
import { Button, Spin } from 'antd';
import { increasePage } from '../../strore/articles/articles.slices';

const NewsFeed: React.FC = () => {
  const articles = useAppSelector(getArticles);
  const isLoading = useAppSelector(getIsLoading);
  const dispatch = useAppDispatch();

  const handleLoadMore = () => {
    dispatch(increasePage());
  }

  return (
    <div>
      <div className={styles.feed}>
        {articles.length === 0 && !isLoading && 'No data'}
        {articles.map((a) => (
          <Article article={a} key={a.title} />
        ))}
      </div>
      <div className={styles.footer}>
        {isLoading && <Spin />}
        {articles.length !== 0 &&
          <Button onClick={handleLoadMore}>
            Load more
          </Button>
        }
      </div>
    </div>
  )
};

export default NewsFeed;