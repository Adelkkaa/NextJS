import React, { useEffect, useCallback, useState } from 'react';
import { Typography } from 'shared/ui/Typography';
import styles from './styles.module.scss';
import { TrackItem } from './ui/TrackItem';
import { useAppDispatch, useAppSelector } from 'redux/app/hooks';
import { useFetchTracksQuery } from 'redux/services/shazamService';
import { setActiveSong, setSongsList } from 'redux/features/activeSong';
import { RootObject, Track } from 'redux/services/types';
import Loader from 'widgets/Loader';

export const SearchPage = () => {
  const { isActive, searchValue } = useAppSelector((state) => state.searchPage);
  const { data, isFetching, isError } = useFetchTracksQuery({ term: searchValue });
  const [prepareData, setPrepareData] = useState<RootObject>({ tracks: [] });
  const dispatch = useAppDispatch();

  const handlePreparationData = useCallback(() => {
    if (data) {
      const obj: {
        tracks: Track[];
      } = {
        tracks: [],
      };
      obj.tracks = data.tracks.hits.map((item) => item.track);
      setPrepareData(obj);
    }
  }, [data]);

  useEffect(() => {
    handlePreparationData();
  }, [data, handlePreparationData]);

  const handlePostPlaylist = () => {
    data && prepareData && dispatch(setSongsList(prepareData));
  };
  return (
    <div className={styles.search}>
      <Typography className={styles.searchTitle} el="h1" weight="bold" level={1}>
        Search Page
      </Typography>
      {isFetching && <Loader />}

      {isActive && data && data.tracks.hits.length > 0 && !isError && !isFetching ? (
        <div className={styles.tracksWrapper}>
          {data.tracks.hits.map(({ track }, index) => (
            <TrackItem
              key={track.key}
              index={index}
              title={track.title}
              subtitle={track.subtitle}
              img={track.images.coverart}
              album={track.title}
              url={track.hub.actions[1].uri || ''}
              handlePostPlaylist={handlePostPlaylist}
            />
          ))}
        </div>
      ) : (
        <Typography el="h3" weight="medium" level={3} className={styles.searchSubtitle}>
          Попробуйте найти любимые треки!
        </Typography>
      )}
    </div>
  );
};
