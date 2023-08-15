import React from 'react';
import { LoginHeader } from './ui/header';
import { LoginForm } from './ui/form';

import styles from './styles.module.scss';

export const LoginPage = () => {
  return (
    <div className={styles.loginPageWrapper}>
      <LoginHeader />
      <LoginForm />
    </div>
  );
};
