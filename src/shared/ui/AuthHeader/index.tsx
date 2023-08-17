import React from 'react';

import styles from './styles.module.scss';
import Image from 'next/image';
import logo from '@images/spotifyLogo.svg';
import Link from 'next/link';

export const AuthHeader = () => (
  <div className={styles.headerWrapper}>
    <Link href={'/'}>
      <Image src={logo} alt="spotify-logo" width={117} height={36} />
    </Link>
  </div>
);
