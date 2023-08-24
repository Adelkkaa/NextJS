import Image from 'next/image';
import React, { forwardRef, useState, useRef } from 'react';

import volumeIcon from '@images/HomePage/volume.svg';
import volumeMuteIcon from '@images/HomePage/volumeMute.svg';

import styles from './styles.module.scss';

const PlayerVolume = forwardRef<HTMLAudioElement>((props, ref) => {
  const [volume, setVolume] = useState(100);
  const prevVolumeRef = useRef<number>(0);

  const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (ref && typeof ref !== 'function' && ref.current) {
      const value = Number(e.target.value) / 100;
      setVolume(Number(e.target.value));
      ref.current.volume = value;
    }
  };

  const handleMuteVolume = () => {
    if (ref && typeof ref !== 'function' && ref.current) {
      if (prevVolumeRef.current === 0) {
        prevVolumeRef.current = volume;
        setVolume(0);
        ref.current.volume = 0;
      } else {
        setVolume(prevVolumeRef.current);
        ref.current.volume = prevVolumeRef.current / 100;
        prevVolumeRef.current = 0;
      }
    }
  };
  return (
    <div className={styles.volume}>
      <Image
        className={styles.volumeIcon}
        src={volume !== 0 ? volumeIcon : volumeMuteIcon}
        alt="volume-icon"
        width={32}
        height={32}
        onClick={handleMuteVolume}
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
  );
});

PlayerVolume.displayName = 'PlayerVolume';

export default PlayerVolume;
