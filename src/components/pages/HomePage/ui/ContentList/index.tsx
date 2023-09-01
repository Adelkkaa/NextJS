import React from 'react';
import { shazamApi } from 'redux/services/shazamService';
import ContentItem from '../ContentItem';

import styles from './styles.module.scss';
import Loader from 'widgets/Loader';
import { RootObject } from 'redux/services/types';
import { useDispatch } from 'react-redux';
import { setSongsList } from 'redux/features/activeSong';

const ContentList = () => {
  const { data, isFetching, error } = shazamApi.useFetchAllChartsQuery();
  const dispatch = useDispatch();
  const handlePostPlaylist = (index: number) => {
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
          />
        ))}
    </div>
  );
};

export default ContentList;
