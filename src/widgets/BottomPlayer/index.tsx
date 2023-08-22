import React, { useState } from 'react';
import Image from 'next/image';

import volumeIcon from '@images/HomePage/volume.svg';
import prevIcon from '@images/HomePage/prev.svg';
import nextIcon from '@images/HomePage/next.svg';
import pauseIcon from '@images/HomePage/pause.svg';

import styles from './styles.module.scss';
import { useAppSelector } from 'redux/app/hooks';
import { Typography } from 'shared/ui/Typography';

const BottomPlayer = () => {
  const [volume, setVolume] = useState(0);

  const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value);
  };

  const { title, subtitle, image, url } = useAppSelector((state) => state.activeSong);
  console.log(title);
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
            width={320}
            height={320}
          />
        )}
      </div>
      {/* <audio controls src={url}></audio> */}
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
            src={pauseIcon}
            alt="pause-icon"
            width={32}
            height={32}
          />
          <Image
            className={styles.controlNext}
            src={nextIcon}
            alt="next-icon"
            width={32}
            height={32}
          />
        </div>
        {/* todo Здесь input нужно под другие контролы пробросить, вдобавок необходимо разнести всё это по компонентам */}
        <input
          min={0}
          max={100}
          onChange={handleChangeVolume}
          value={volume}
          className={styles.timeRange}
          type="range"
        />
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
