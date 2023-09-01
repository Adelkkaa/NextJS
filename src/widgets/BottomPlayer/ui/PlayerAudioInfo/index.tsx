import React from 'react';

import styles from './styles.module.scss';
import { Typography } from 'shared/ui/Typography';
import Image from 'next/image';
import { useBreakpoint, useWindowSize } from 'shared/hooks';

type Props = {
  title: string;
  subtitle: string;
  image: string;
};

const PlayerAudioInfo: React.FC<Props> = ({ title, subtitle, image }) => {
  const { isPortraitTablet, isLaptop } = useBreakpoint();

  return (
    <div className={styles.audioInfo}>
      <Typography className={styles.audioInfoTitle} weight="bold" level={6}>
        {title}
      </Typography>
      <Typography className={styles.audioInfoSubtitle} style={{ opacity: 0.6 }} level={6}>
        {subtitle}
      </Typography>
      {image && !isPortraitTablet && (
        <Image
          className={styles.audioInfoImg}
          src={image}
          alt="song-image"
          width={310}
          height={310}
        />
      )}
    </div>
  );
};

export default PlayerAudioInfo;
