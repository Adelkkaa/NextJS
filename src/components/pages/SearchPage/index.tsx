import React from 'react';
import { Typography } from 'shared/ui/Typography';
import styles from './styles.module.scss';
import { TrackItem } from './ui/TrackItem';

export const SearchPage = () => {
  return (
    <div className={styles.search}>
      <Typography className={styles.searchTitle} el="h1" weight="bold" level={1}>
        Search Page
      </Typography>
      {true ? (
        <TrackItem />
      ) : (
        <Typography el="h3" weight="medium" level={3} className={styles.searchSubtitle}>
          Попробуйте найти любимые треки!
        </Typography>
      )}
    </div>
  );
};
