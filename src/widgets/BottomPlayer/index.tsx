import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

import volumeIcon from '@images/HomePage/volume.svg';
import prevIcon from '@images/HomePage/prev.svg';
import nextIcon from '@images/HomePage/next.svg';
import pauseIcon from '@images/HomePage/pause.svg';
import playIcon from '@images/HomePage/play.svg';

import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from 'redux/app/hooks';
import { Typography } from 'shared/ui/Typography';
import { setIsPlaying } from 'redux/features/activeSong';

const BottomPlayer = () => {
  const { title, subtitle, image, url, isPlaying } = useAppSelector((state) => state.activeSong);
  const dispatch = useAppDispatch();

  const [volume, setVolume] = useState(1);
  const [fullTime, setFullTime] = useState('00:00');
  const [currTime, setCurrTime] = useState('00:00');
  const [timeValue, setTimeValue] = useState(0);

  const playerRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timer>();

  const serializeTime = (time: number) => {
    if (time > 0) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.ceil(time - minutes * 60 - 1);
      return seconds >= 10 ? `0${minutes}:${seconds}` : `0${minutes}:0${seconds}`;
    } else return '00:00';
  };
  const serializeInputValue = (current: number, full: number): number => {
    if (current && full) {
      const percent = (current / full) * 100;
      return percent;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (playerRef && playerRef.current) {
      intervalRef.current = setInterval(() => {
        if (playerRef && playerRef.current) {
          setCurrTime(serializeTime(playerRef.current.currentTime));
          setTimeValue(
            serializeInputValue(playerRef.current.currentTime, playerRef.current.duration),
          );
        }
      }, 100);
      playerRef.current.onloadedmetadata = () => {
        playerRef && playerRef.current && setFullTime(serializeTime(playerRef.current.duration));
      };
      if (isPlaying) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isPlaying, url]);

  const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (playerRef && playerRef.current) {
      const value = Number(e.target.value) / 100;
      setVolume(Number(e.target.value));
      playerRef.current.volume = value;
    }
  };

  const handleChangeRangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (playerRef && playerRef.current) {
      const value = (Number(e.target.value) / 100) * playerRef.current?.duration;
      playerRef.current.currentTime = value;
      setTimeValue(Number(e.target.value));
    }
  };

  const handleClickControlButton = () => {
    if (playerRef && playerRef.current && url !== '') {
      isPlaying ? dispatch(setIsPlaying(false)) : dispatch(setIsPlaying(true));
    }
  };

  return (
    <div className={styles.bottomPlayer}>
      <div className={styles.audioInfo}>
        <Typography className={styles.audioInfoTitle} weight="bold" level={6}>
          {title}
        </Typography>
        <Typography className={styles.audioInfoSubtitle} style={{ opacity: 0.6 }} level={6}>
          {subtitle}
        </Typography>
        {image && (
          <Image
            className={styles.audioInfoImg}
            src={image}
            alt="song-image"
            width={310}
            height={310}
          />
        )}
      </div>
      <audio style={{ display: 'none' }} ref={playerRef} controls src={url}></audio>
      <div className={styles.audioPlayer}>
        <div className={styles.controlWrapper}>
          <Image
            className={styles.controlPrev}
            src={prevIcon}
            alt="prev-icon"
            width={32}
            height={32}
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
          />
        </div>
        <div className={styles.timeRangeWrapper}>
          <Typography className={styles.timeRangeTitle}>{currTime}</Typography>
          <input
            min={0}
            max={100}
            onChange={(e) => handleChangeRangeValue(e)}
            value={timeValue}
            className={styles.timeRange}
            type="range"
          />
          <Typography className={styles.timeRangeTitle}>{fullTime}</Typography>
        </div>
      </div>
      <div className={styles.volume}>
        <Image
          className={styles.volumeIcon}
          src={volumeIcon}
          alt="volume-icon"
          width={32}
          height={32}
        />
        <input
          min={0}
          max={100}
          onChange={handleChangeVolume}
          value={volume}
          className={styles.volumeRange}
          type="range"
        />
      </div>
    </div>
  );
};

export default BottomPlayer;
