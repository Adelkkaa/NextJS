import React, { useRef, useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { Typography } from 'shared/ui/Typography';
import Image from 'next/image';
import { serializeTime } from 'shared/methods/serializeTime';
import { useAppDispatch, useAppSelector } from 'redux/app/hooks';
import { setActiveSong, setIsPlaying } from 'redux/features/activeSong';
import { ActiveSongIcon } from './icons/ActiveSongIcon';
import cn from 'classnames';

type Props = {
  index: number;
  img: string;
  title: string;
  subtitle: string;
  album: string;
  url: string;
  handlePostPlaylist: () => void;
};

export const TrackItem: React.FC<Props> = ({
  index,
  img,
  subtitle,
  title,
  album,
  url,
  handlePostPlaylist,
}) => {
  const timeRef = useRef<HTMLAudioElement | null>(null);
  const [time, setTime] = useState('');
  const dispatch = useAppDispatch();
  const { url: storeUrl, isPlaying, activeIndex } = useAppSelector((state) => state.activeSong);

  useEffect(() => {
    if (timeRef && timeRef.current) {
      timeRef.current.onloadedmetadata = () => {
        timeRef && timeRef.current && setTime(serializeTime(timeRef.current.duration));
      };
    }
  }, [timeRef]);

  const currentSongPlayed = activeIndex === index && storeUrl !== '' && storeUrl === url;

  const handleClickSong = () => {
    dispatch(setActiveSong({ title, subtitle, url, image: img, activeIndex: index }));
    handlePostPlaylist();
    isPlaying && currentSongPlayed ? dispatch(setIsPlaying(false)) : dispatch(setIsPlaying(true));
  };

  return (
    <div className={styles.trackWrapper} onClick={handleClickSong}>
      <audio style={{ display: 'none' }} ref={timeRef} src={url} />
      <div className={styles.trackPreview}>
        {currentSongPlayed ? (
          <div
            className={cn(styles.activeIcon, {
              [styles.activeIconPlaying]: isPlaying,
            })}
          >
            <ActiveSongIcon />{' '}
          </div>
        ) : (
          <div className={styles.index}>
            <Typography level={5}>{index + 1}</Typography>
          </div>
        )}
        <Image src={img} alt="profile-avatar" width={52} height={52} />
      </div>
      <div className={styles.trackInfo}>
        <Typography level={5}>{title}</Typography>
        <Typography level={5}>{subtitle}</Typography>
      </div>
      <Typography className={styles.trackAlbum} level={5}>
        {album}
      </Typography>
      <Typography className={styles.trackTime} level={5}>
        {time}
      </Typography>
    </div>
  );
};