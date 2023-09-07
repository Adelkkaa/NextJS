import React from 'react';

import styles from './styles.module.scss';
import Image from 'next/image';
import katty from './katty.jpg';

export const LikedPage = () => {
  return (
    <div className={styles.katty}>
      <Image className={styles.kattyImg} src={katty} width={400} height={400} alt="katty" />
    </div>
  );
};
