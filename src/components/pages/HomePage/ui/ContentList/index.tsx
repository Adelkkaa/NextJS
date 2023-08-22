import React from 'react';
import { shazamApi } from 'redux/services/shazamService';
import ContentItem from '../ContentItem';

import styles from './styles.module.scss';
import Loader from 'widgets/Loader';

const ContentList = () => {
  const { data, isFetching, error } = shazamApi.useFetchAllChartsQuery();
  return (
    <div className={styles.songListWrapper}>
      {isFetching && <Loader />}
      {data &&
        data.tracks.map((item) => (
          <ContentItem
            key={item.key}
            title={item.title}
            subtitle={item.subtitle}
            url={item.hub.actions[1].uri!}
            image={item.images.coverart}
          />
        ))}
    </div>
  );
};

export default ContentList;
