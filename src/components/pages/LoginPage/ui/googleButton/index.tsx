import React from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import styles from './style.module.scss';

const GoogleButton = () => {
  return (
    <button className={styles.google} onClick={() => signIn('google', { redirect: false })}>
      <span className={styles.googleLogo}></span>
      <span className={styles.googleText}>Авторизоваться через Google</span>
    </button>
  );
};

export default GoogleButton;
