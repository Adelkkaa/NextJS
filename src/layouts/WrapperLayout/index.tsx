import { FC, PropsWithChildren } from 'react';

import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { AuthLayout } from 'layouts/AuthLayout';
import { MainLayout } from 'layouts/MainLayout';

export const WrapperLaypout: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <>
      {pathname === '/login' || pathname === '/registration' ? (
        <AuthLayout>{children}</AuthLayout>
      ) : (
        <MainLayout>{children}</MainLayout>
      )}
    </>
  );
};
