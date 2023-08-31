import { FC, PropsWithChildren } from 'react';
import { AuthHeader } from 'widgets/AuthHeader';

import styles from './styles.module.scss';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.authPageWrapper}>
      <AuthHeader />
      {children}
    </div>
  );
};
