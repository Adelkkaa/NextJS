import React from 'react';
import styles from './styles.module.scss';
import { MainLayout } from 'components/layouts/MainLayout';
import ContentList from './ui/ContentList';

export const HomePage = () => {
  return (
    <div className={styles.home}>
      <MainLayout>
        <ContentList />
      </MainLayout>
    </div>
  );
};
