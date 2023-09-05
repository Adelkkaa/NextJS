import React from 'react';

import styles from './styles.module.scss';
import { Typography } from 'shared/ui/Typography';
import skeletonAvatar from '@images/SearchPage/mock.png';
import Image from 'next/image';

type Props = {
  index?: number;
  img?: string;
  title?: string;
  album?: string;
  time?: string;
};

export const TrackItem: React.FC<Props> = ({ index, img, title, album, time }) => {
  return (
    <div className={styles.trackWrapper}>
      <div className={styles.trackPreview}>
        <Typography level={5}>1</Typography>
        <Image src={skeletonAvatar} alt="profile-avatar" width={52} height={52} />
      </div>
      <div className={styles.trackInfo}>
        <Typography level={5}>Play It Safe</Typography>
        <Typography level={5}>Julia Wolf</Typography>
      </div>
      <Typography className={styles.trackAlbum} level={5}>
        Play It Safe
      </Typography>
      <Typography className={styles.trackTime} level={5}>
        2:21
      </Typography>
    </div>
  );
};
