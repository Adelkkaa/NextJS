import React from 'react';
import styles from './styles.module.scss';
import { MainLayout } from 'components/layouts/MainLayout';

export const HomePage = () => {
  return (
    <div className={styles.home}>
      <MainLayout></MainLayout>
    </div>
  );
};
