import React from 'react';
import styles from './styles.module.scss';
import { MainLayout } from 'layouts/MainLayout';
import ContentList from './ui/ContentList';
import { Typography } from 'shared/ui/Typography';

export const HomePage = () => {
  return (
    <div className={styles.home}>
      <Typography className={styles.homeTitle} el="h1" weight="bold" level={1}>
        Home Page
      </Typography>
      <ContentList />
    </div>
  );
};
