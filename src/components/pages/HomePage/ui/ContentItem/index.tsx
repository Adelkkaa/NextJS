import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import { Typography } from 'shared/ui/Typography';

import playIcon from '@images/HomePage/play.svg';
import pauseIcon from '@images/HomePage/pause.svg';
import { useAppDispatch, useAppSelector } from 'redux/app/hooks';
import { setActiveSong, setIsPlaying } from 'redux/features/activeSong';
import cn from 'classnames';
import { Heart } from 'shared/ui/Heart';
import { Track } from 'redux/services/types';
import { setLikedSong } from 'redux/features/actionCreators';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

type Props = {
  title: string;
  subtitle: string;
  url: string;
  image: string;
  index: number;
  handlePostPlaylist: () => void;
  fullInfoTrack: Track;
};

const ContentItem: React.FC<Props> = ({
  title,
  subtitle,
  url,
  image,
  handlePostPlaylist,
  index,
  fullInfoTrack,
}) => {
  const dispatch = useAppDispatch();
  const { data, status } = useSession();

  const { url: storeUrl, isPlaying, activeIndex } = useAppSelector((state) => state.activeSong);
  const currentSongPlayed = activeIndex === index && storeUrl !== '' && storeUrl === url;
  const { likedSongs } = useAppSelector((state) => state.likedSong);
  const isActive = likedSongs.findIndex((item) => fullInfoTrack.key === item.key) !== -1;

  const handleClickSong = () => {
    dispatch(setActiveSong({ title, subtitle, url, image, activeIndex: index }));
    handlePostPlaylist();
    isPlaying && currentSongPlayed ? dispatch(setIsPlaying(false)) : dispatch(setIsPlaying(true));
  };

  const handleClickFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (status === 'authenticated' && data.user && data.user.email && !isActive) {
      dispatch(setLikedSong({ id: data.user.email, tracks: [...likedSongs, fullInfoTrack] }));
    } else if (status === 'authenticated' && data.user && data.user.email && isActive) {
      const tracks = likedSongs.filter((item) => item.key !== fullInfoTrack.key);
      dispatch(setLikedSong({ id: data.user.email, tracks: [...tracks] }));
    } else {
      toast.error('Вы должны авторизоваться!');
    }
  };

  return (
    <div
      className={cn(styles.songWrapper, {
        [styles.songWrapperActive]: currentSongPlayed,
      })}
      onClick={handleClickSong}
    >
      <div className={styles.songImgWrapper}>
        <Image className={styles.songImg} src={image} width={250} height={250} alt={'song-image'} />
        <Image
          className={styles.playImg}
          src={isPlaying && currentSongPlayed ? pauseIcon : playIcon}
          width={48}
          height={48}
          alt={'play-icon'}
        />
        <div
          onClick={handleClickFavorite}
          className={cn(styles.songImgFavorite, {
            [styles.songImgFavoriteActive]: isActive,
          })}
        >
          <Heart />
        </div>
      </div>
      <Typography className={styles.songTitle} weight="bold" level={5}>
        {title}
      </Typography>
      <Typography className={styles.songArtist}>{subtitle}</Typography>
    </div>
  );
};

export default ContentItem;
