import React, { useEffect, useCallback, useState } from 'react';
import { Typography } from 'shared/ui/Typography';
import styles from './styles.module.scss';
import { TrackItem } from 'shared/ui/TrackItem';
import { useAppDispatch, useAppSelector } from 'redux/app/hooks';
import { useFetchTracksQuery } from 'redux/services/shazamService';
import { setActiveSong, setSongsList } from 'redux/features/activeSong';
import { RootObject, Track } from 'redux/services/types';
import Loader from 'widgets/Loader';
import { fetchLikedSongs } from 'redux/features/actionCreators';
import { useSession } from 'next-auth/react';

export const LikedPage = () => {
  const dispatch = useAppDispatch();
  const { data: sessionData, status } = useSession();
  const { likedSongs, isLoading, error } = useAppSelector((state) => state.likedSong);

  useEffect(() => {
    if (status === 'authenticated' && sessionData.user && sessionData.user.email) {
      dispatch(fetchLikedSongs(sessionData.user.email));
    }
  }, [dispatch, status, sessionData?.user]);

  const handlePostPlaylist = () => {
    likedSongs && dispatch(setSongsList({ tracks: likedSongs }));
  };
  return (
    <div className={styles.search}>
      <Typography className={styles.searchTitle} el="h1" weight="bold" level={1}>
        Liked Page
      </Typography>
      {isLoading && <Loader />}

      {likedSongs && likedSongs.length > 0 && !error && !isLoading ? (
        <div className={styles.tracksWrapper}>
          <div className={styles.trackWrapper}>
            <Typography color="gray" className={styles.trackIndex} level={6}>
              #
            </Typography>
            <Typography color="gray" className={styles.trackTitle} level={6}>
              Title
            </Typography>
            <Typography color="gray" className={styles.trackAlbum} level={6}>
              Album
            </Typography>
            <Typography color="gray" className={styles.trackTime} level={6}>
              Time
            </Typography>
          </div>
          {likedSongs.map((item, index) => (
            <TrackItem
              key={item.key}
              index={index}
              title={item.title}
              album={item.title}
              subtitle={item.subtitle}
              url={item.hub.actions[1].uri!}
              img={item.images.coverart}
              fullInfoTrack={item}
              handlePostPlaylist={handlePostPlaylist}
            />
          ))}
        </div>
      ) : (
        <Typography el="h3" weight="medium" level={3} className={styles.searchSubtitle}>
          Добавьте треки в избранное, чтобы они здесь отображались!
        </Typography>
      )}
    </div>
  );
};
