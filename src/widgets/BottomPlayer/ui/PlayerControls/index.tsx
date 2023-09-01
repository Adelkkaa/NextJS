import Image from 'next/image';
import React, { forwardRef } from 'react';

import prevIcon from '@images/HomePage/prev.svg';
import nextIcon from '@images/HomePage/next.svg';
import pauseIcon from '@images/HomePage/pause.svg';
import playIcon from '@images/HomePage/play.svg';
import shuffleIcon from '@images/HomePage/shuffle.svg';
import repeatIcon from '@images/HomePage/repeat.svg';

import styles from './styles.module.scss';
import { useAppDispatch } from 'redux/app/hooks';
import {
  setIsPlaying,
  setIsRepeat,
  setIsShuffle,
  setNextSong,
  setPreviousSong,
} from 'redux/features/activeSong';
import RepeatSVG from './icons/RepeatSVG';
import cn from 'classnames';
import ShuffleSVG from './icons/ShuffleSVG';

type Props = {
  isPlaying: boolean;
  isRepeat: boolean;
  isShuffle: boolean;
  url: string;
  handleNextSong: () => void;
};

const PlayerControls = forwardRef<HTMLAudioElement, Props>(
  ({ isPlaying, url, isRepeat, isShuffle, handleNextSong }, ref) => {
    const dispatch = useAppDispatch();

    const handleClickControlButton = () => {
      if (ref && typeof ref !== 'function' && ref.current && url !== '') {
        isPlaying ? dispatch(setIsPlaying(false)) : dispatch(setIsPlaying(true));
      }
    };

    const handleClickPrevButton = () => {
      dispatch(setPreviousSong());
    };

    const handleClickRepeatButton = () => {
      dispatch(setIsRepeat());
    };

    const handleClickShuffleButton = () => {
      dispatch(setIsShuffle());
    };
    return (
      <div className={styles.controlWrapper}>
        <div
          className={cn(styles.controlShuffle, {
            [styles.controlShuffleActive]: isShuffle,
          })}
          onClick={handleClickShuffleButton}
        >
          <ShuffleSVG />
        </div>
        <Image
          className={styles.controlPrev}
          src={prevIcon}
          alt="prev-icon"
          width={32}
          height={32}
          onClick={handleClickPrevButton}
        />
        <Image
          className={styles.controlPause}
          src={isPlaying ? pauseIcon : playIcon}
          alt="pause-icon"
          width={32}
          height={32}
          onClick={handleClickControlButton}
        />
        <Image
          className={styles.controlNext}
          src={nextIcon}
          alt="next-icon"
          width={32}
          height={32}
          onClick={handleNextSong}
        />
        <div
          className={cn(styles.controlRepeat, {
            [styles.controlRepeatActive]: isRepeat,
          })}
          onClick={handleClickRepeatButton}
        >
          <RepeatSVG />
        </div>
      </div>
    );
  },
);

PlayerControls.displayName = 'PlayerControls';

export default PlayerControls;
