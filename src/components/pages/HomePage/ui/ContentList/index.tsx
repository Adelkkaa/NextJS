import React, { useEffect } from 'react';
import { shazamApi } from 'redux/services/shazamService';
import ContentItem from '../ContentItem';

import styles from './styles.module.scss';
import Loader from 'widgets/Loader';
import { setSongsList } from 'redux/features/activeSong';
import { useAppDispatch, useAppSelector } from 'redux/app/hooks';
import { useSession } from 'next-auth/react';
import { fetchLikedSongs } from 'redux/features/actionCreators';

const ContentList = () => {
  const { data, isFetching, error } = shazamApi.useFetchAllChartsQuery();
  const dispatch = useAppDispatch();
  const { data: sessionData, status } = useSession();
  const { likedSongs } = useAppSelector((state) => state.likedSong);

  useEffect(() => {
    if (status === 'authenticated' && sessionData.user && sessionData.user.email) {
      dispatch(fetchLikedSongs(sessionData.user.email));
    }
  }, [dispatch, status, sessionData?.user]);
  const handlePostPlaylist = () => {
    data && dispatch(setSongsList(data));
  };

  return (
    <div className={styles.songListWrapper}>
      {isFetching && <Loader />}
      {data &&
        data.tracks.map((item, index) => (
          <ContentItem
            key={item.key}
            index={index}
            title={item.title}
            subtitle={item.subtitle}
            url={item.hub.actions[1].uri!}
            image={item.images.coverart}
            handlePostPlaylist={handlePostPlaylist}
            fullInfoTrack={item}
          />
        ))}
    </div>
  );
};

export default ContentList;
