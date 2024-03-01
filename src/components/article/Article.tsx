import React from 'react';
import styles from './Article.module.css';
import IArticle from '../../data/IArticle';

interface IArticleProps {
  article: IArticle
}

const Article: React.FC<IArticleProps> = ({ article }) => (
  <article className={styles.news_item}>
    <div>
      {article.urlToImage && <img src={article.urlToImage} alt="News" aria-label="News Image" />}
    </div>
    <div
      className={styles.content}
      style={{ height: article.urlToImage ? 'calc(100% - 125px)' : 'calc(100% - 20px)' }}
    >
      <div>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <h3>{article.title}</h3>
        </a>
      </div>
      <div className={styles.footer}>
        <p aria-label="Source">{article.source}</p>
        <p aria-label="Published Date">{new Date(article.publishedAt).toLocaleString()}</p>
      </div>
    </div>
  </article>
)

export default Article;