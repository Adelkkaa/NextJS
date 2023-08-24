import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from 'redux/app/hooks';
import { setIsPlaying } from 'redux/features/activeSong';
import PlayerAudioInfo from './ui/PlayerAudioInfo';
import PlayerControls from './ui/PlayerControls';
import PlayerTimeRange from './ui/PlayerTimeRange';
import PlayerVolume from './ui/PlayerVolume';

// todo  выяснить как правильно будет реализовать логику переключения на следующий и предыдущий треки

const BottomPlayer = () => {
  const { title, subtitle, image, url, isPlaying } = useAppSelector((state) => state.activeSong);
  const dispatch = useAppDispatch();

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
  }, [isPlaying, url, dispatch]);

  return (
    <div className={styles.bottomPlayer}>
      <PlayerAudioInfo title={title} subtitle={subtitle} image={image} />
      <audio
        onPlay={() => dispatch(setIsPlaying(true))}
        onPause={() => dispatch(setIsPlaying(false))}
        style={{ display: 'none' }}
        ref={playerRef}
        controls
        src={url}
      ></audio>
      <div className={styles.audioPlayer}>
        <PlayerControls isPlaying={isPlaying} url={url} ref={playerRef} />
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
