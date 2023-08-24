import React, { forwardRef, useRef } from 'react';
import { Typography } from 'shared/ui/Typography';

import styles from './styles.module.scss';
import { useAppDispatch } from 'redux/app/hooks';
import { setIsPlaying } from 'redux/features/activeSong';

type Props = {
  currTime: string;
  fullTime: string;
  timeValue: number;
  isPlaying: boolean;
  setTimeValue: (arg: number) => void;
};

const PlayerTimeRange = forwardRef<HTMLAudioElement, Props>(
  ({ currTime, fullTime, timeValue, isPlaying, setTimeValue }, ref) => {
    const dispatch = useAppDispatch();
    const pauseRef = useRef(false);

    const handleChangeRangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (ref && typeof ref !== 'function' && ref.current) {
        const value = (Number(e.target.value) / 100) * ref.current?.duration;
        ref.current.currentTime = value;
        setTimeValue(Number(e.target.value));
      }
    };

    const handlePointerDown = () => {
      pauseRef.current = isPlaying;
      dispatch(setIsPlaying(false));
    };

    const handlePointerUp = () => {
      pauseRef.current && dispatch(setIsPlaying(true));
    };
    return (
      <div className={styles.timeRangeWrapper}>
        <Typography className={styles.timeRangeTitle}>{currTime}</Typography>
        <input
          min={0}
          max={100}
          onChange={(e) => handleChangeRangeValue(e)}
          onPointerUp={handlePointerUp}
          onPointerDown={handlePointerDown}
          value={timeValue}
          className={styles.timeRange}
          type="range"
        />
        <Typography className={styles.timeRangeTitle}>{fullTime}</Typography>
      </div>
    );
  },
);

PlayerTimeRange.displayName = 'PlayerTimeRange';

export default PlayerTimeRange;
