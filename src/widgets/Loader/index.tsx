import Image from 'next/image';
import React from 'react';

import loader from '@images/loader.svg';

import styles from './styles.module.scss';

const Loader = () => {
  return <Image className={styles.loader} src={loader} width={100} height={100} alt="loader" />;
};

export default Loader;
