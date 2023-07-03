import { FunctionComponent, useEffect, useState } from 'react';

import { ArticlesService } from '../../../models/resources/articles/articles.service';
import { Article as ArticleType } from '../../../types/model/Article';
import { Article } from '../../modules/article/article';
import { Loading } from '../../modules/loading/loading';

import styles from './quibbler.module.scss';

export const Quibbler: FunctionComponent = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleType[]>();

  useEffect(() => {
    if (!loaded) {
      Promise.all([getArticles()]).finally(() => setLoaded(true));
    }
  }, [loaded]);

  const getArticles = async () => {
    const res = await ArticlesService.getArticles();
    setArticles(res);
  };

  if (!loaded) {
    return <Loading />;
  }

  if (!articles) {
    return null;
  }

  return (
    <div className={styles.main}>
      <div className={styles.articles}>
        {loaded &&
          articles
            .filter((a: ArticleType) => a.status === 'ENABLE')
            .reverse()
            .map((article: ArticleType) => <Article key={article.newsId} article={article} />)}
      </div>
    </div>
  );
};
