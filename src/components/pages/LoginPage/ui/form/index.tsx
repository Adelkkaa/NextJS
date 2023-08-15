import React from 'react';
import styles from './styles.module.scss';
import { Typography } from 'shared/ui/Typography';

// todo Сделать форму авторизации с помощью react-hook-forms, свой Input, поменять место хранения redux

export const LoginForm = () => {
  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.formTitle}>Войти в Spotify</h1>
      <form></form>
    </div>
  );
};
