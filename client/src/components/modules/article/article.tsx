import { FunctionComponent } from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { useTranslation } from 'react-multi-lang';

import { Article as ArticleType } from '../../../types/model/Article';
import { getDateDiff } from '../../../utils/date/date';

import styles from './article.module.scss';

type Props = {
  article: ArticleType;
};

export const Article: FunctionComponent<Props> = ({ article }) => {
  const publishDate = getDateDiff(Date.now(), article.date);

  const t = useTranslation();

  return (
    <article className={styles.article}>
      <img src={article.image} alt="Article" />
      <div className={styles.content}>
        <h1>{article.title}</h1>
        <h2>{article.subtitle}</h2>
        <p className={styles.text}>{article.text}</p>
        <div className={styles.date}>
          <BiTimeFive />
          <p>{`${t('article.ago')} ${publishDate.diff} ${t(publishDate.unit)}`}</p>
        </div>
      </div>
    </article>
  );
};
