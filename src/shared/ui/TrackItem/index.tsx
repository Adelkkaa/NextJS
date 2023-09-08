import React, { useRef, useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { Typography } from 'shared/ui/Typography';
import Image from 'next/image';
import { serializeTime } from 'shared/methods/serializeTime';
import { useAppDispatch, useAppSelector } from 'redux/app/hooks';
import { setActiveSong, setIsPlaying } from 'redux/features/activeSong';
import { ActiveSongIcon } from './icons/ActiveSongIcon';
import cn from 'classnames';
import { Heart } from 'shared/ui/Heart';
import { Track } from 'redux/services/types';
import { useSession } from 'next-auth/react';
import { setLikedSong } from 'redux/features/actionCreators';
import { toast } from 'react-toastify';

type Props = {
  index: number;
  img: string;
  title: string;
  subtitle: string;
  album: string;
  url: string;
  handlePostPlaylist: () => void;
  fullInfoTrack: Track;
};

export const TrackItem: React.FC<Props> = ({
  index,
  img,
  subtitle,
  title,
  album,
  url,
  handlePostPlaylist,
  fullInfoTrack,
}) => {
  const timeRef = useRef<HTMLAudioElement | null>(null);
  const [time, setTime] = useState('');
  const dispatch = useAppDispatch();
  const { url: storeUrl, isPlaying, activeIndex } = useAppSelector((state) => state.activeSong);
  const { data, status } = useSession();
  const { likedSongs } = useAppSelector((state) => state.likedSong);
  const isActive = likedSongs.findIndex((item) => fullInfoTrack.key === item.key) !== -1;

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
            <Typography level={6}>{index + 1}</Typography>
          </div>
        )}
        <Image
          src={img}
          className={styles.trackAvatar}
          alt="profile-avatar"
          width={52}
          height={52}
        />
      </div>
      <div className={styles.trackInfo}>
        <Typography level={6}>{title}</Typography>
        <Typography level={6}>{subtitle}</Typography>
      </div>
      <Typography className={styles.trackAlbum} level={6}>
        {album}
      </Typography>
      <div className={styles.trackTimeWrapper}>
        <div
          onClick={handleClickFavorite}
          className={cn(styles.trackImgFavorite, {
            [styles.trackImgFavoriteActive]: isActive,
          })}
        >
          <Heart />
        </div>
        <Typography className={styles.trackTime} level={6}>
          {time}
        </Typography>
      </div>
    </div>
  );
};
