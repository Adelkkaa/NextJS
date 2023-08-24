import Image from 'next/image';
import React, { forwardRef } from 'react';

import prevIcon from '@images/HomePage/prev.svg';
import nextIcon from '@images/HomePage/next.svg';
import pauseIcon from '@images/HomePage/pause.svg';
import playIcon from '@images/HomePage/play.svg';

import styles from './styles.module.scss';
import { useAppDispatch } from 'redux/app/hooks';
import { setIsPlaying } from 'redux/features/activeSong';

type Props = {
  isPlaying: boolean;
  url: string;
};

const PlayerControls = forwardRef<HTMLAudioElement, Props>(({ isPlaying, url }, ref) => {
  const dispatch = useAppDispatch();

  const handleClickControlButton = () => {
    if (ref && typeof ref !== 'function' && ref.current && url !== '') {
      isPlaying ? dispatch(setIsPlaying(false)) : dispatch(setIsPlaying(true));
    }
  };
  return (
    <div className={styles.controlWrapper}>
      <Image className={styles.controlPrev} src={prevIcon} alt="prev-icon" width={32} height={32} />
      <Image
        className={styles.controlPause}
        src={isPlaying ? pauseIcon : playIcon}
        alt="pause-icon"
        width={32}
        height={32}
        onClick={handleClickControlButton}
      />
      <Image className={styles.controlNext} src={nextIcon} alt="next-icon" width={32} height={32} />
    </div>
  );
});

PlayerControls.displayName = 'PlayerControls';

export default PlayerControls;
