import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from 'redux/app/hooks';
import activeSong, { setIsPlaying, setNextSong } from 'redux/features/activeSong';
import PlayerAudioInfo from './ui/PlayerAudioInfo';
import PlayerControls from './ui/PlayerControls';
import PlayerTimeRange from './ui/PlayerTimeRange';
import PlayerVolume from './ui/PlayerVolume';
import { Track } from 'redux/services/types';
import { serializeTime } from 'shared/methods/serializeTime';

export const getRandomValue = (arr: Track[]): number => {
  return Math.floor(0 + Math.random() * (arr.length - 1 + 1 - 0));
};

const BottomPlayer = () => {
  const { title, subtitle, image, url, isPlaying, isRepeat, isShuffle, tracks, activeIndex } =
    useAppSelector((state) => state.activeSong);
  const dispatch = useAppDispatch();

  const [fullTime, setFullTime] = useState('00:00');
  const [currTime, setCurrTime] = useState('00:00');
  const [timeValue, setTimeValue] = useState(0);

  const playerRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timer>();

  const serializeInputValue = (current: number, full: number): number => {
    if (current && full) {
      const percent = (current / full) * 100;
      return percent;
    } else {
      return 0;
    }
  };

  const handleNextSong = () => {
    isRepeat
      ? dispatch(setNextSong(activeIndex))
      : isShuffle
      ? dispatch(setNextSong(getRandomValue(tracks)))
      : dispatch(setNextSong(activeIndex + 1));
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
      } else if (isPlaying && isRepeat && timeValue > 99) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isPlaying, url, dispatch, isRepeat, timeValue]);

  return (
    <div className={styles.bottomPlayer}>
      <PlayerAudioInfo title={title} subtitle={subtitle} image={image} />
      <audio
        onPlay={() => dispatch(setIsPlaying(true))}
        onPause={() => {
          timeValue > 99 && isPlaying ? handleNextSong() : dispatch(setIsPlaying(false));
        }}
        style={{ display: 'none' }}
        ref={playerRef}
        controls
        src={url}
      ></audio>
      <div className={styles.audioPlayer}>
        <PlayerControls
          isRepeat={isRepeat}
          isShuffle={isShuffle}
          isPlaying={isPlaying}
          url={url}
          ref={playerRef}
          handleNextSong={handleNextSong}
        />
        <PlayerTimeRange
          currTime={currTime}
          fullTime={fullTime}
          timeValue={timeValue}
          isPlaying={isPlaying}
          setTimeValue={setTimeValue}
          ref={playerRef}
        />
      </div>
      <PlayerVolume ref={playerRef} />
    </div>
  );
};

export default BottomPlayer;
