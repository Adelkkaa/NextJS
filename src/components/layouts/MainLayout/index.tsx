import { FC, PropsWithChildren } from 'react';

import styles from './styles.module.scss';
import LeftMenu from 'widgets/LeftMenu';
import MainHeader from 'widgets/MainHeader';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.mainPageWrapper}>
      <LeftMenu />
      <div className={styles.mainPageContent}>
        <MainHeader />
        {children}
      </div>
    </div>
  );
};
