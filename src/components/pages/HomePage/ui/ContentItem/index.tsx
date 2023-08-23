import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import { Typography } from 'shared/ui/Typography';

import playIcon from '@images/HomePage/play.svg';
import pauseIcon from '@images/HomePage/pause.svg';
import { useAppDispatch, useAppSelector } from 'redux/app/hooks';
import { setActiveSong, setIsPlaying } from 'redux/features/activeSong';

type Props = {
  title: string;
  subtitle: string;
  url: string;
  image: string;
};

const ContentItem: React.FC<Props> = ({ title, subtitle, url, image }) => {
  const dispatch = useAppDispatch();

  const { url: storeUrl, isPlaying } = useAppSelector((state) => state.activeSong);
  const currentSongPlayed = storeUrl === url;

  const handleClickSong = () => {
    dispatch(setActiveSong({ title, subtitle, url, image }));
    isPlaying && currentSongPlayed ? dispatch(setIsPlaying(false)) : dispatch(setIsPlaying(true));
  };

  return (
    <div className={styles.songWrapper} onClick={handleClickSong}>
      <div className={styles.songImgWrapper}>
        <Image className={styles.songImg} src={image} width={250} height={250} alt={'song-image'} />
        <Image
          className={styles.playImg}
          src={isPlaying && currentSongPlayed ? pauseIcon : playIcon}
          width={48}
          height={48}
          alt={'play-icon'}
        />
      </div>
      <Typography className={styles.songTitle} weight="bold" level={5}>
        {title}
      </Typography>
      <Typography className={styles.songArtist}>{subtitle}</Typography>
    </div>
  );
};

export default ContentItem;
