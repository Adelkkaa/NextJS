import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { SearchLoop } from './icons/SearchLoop';
import { useDebounce } from 'shared/hooks/useDebounce';
import { Typography } from '../Typography';
import cn from 'classnames';
import { useAppDispatch } from 'redux/app/hooks';
import { setSearchValue } from 'redux/features/searchPage';
import { shazamApi } from 'redux/services/shazamService';

// Запрос закоменчен лишь потому что на дебаге уходит много запросов, а максималка = 500 в месяц

export const SearchInput = () => {
  const [value, setValue] = useState('');
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const debouncedSearchTerm = useDebounce(value, 500);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timer>();
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = shazamApi.useFetchAutoCompleteQuery({
    term: debouncedSearchTerm,
  });

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  });
  // const data = { hints: [{ term: '' }] };

  const handleSubmitSearch = () => {
    if (data && selectedSuggestionIndex !== -1) {
      setValue(data.hints[selectedSuggestionIndex].term);
      setSelectedSuggestionIndex(-1);
      dispatch(setSearchValue(data.hints[selectedSuggestionIndex].term));
      setIsFocused(false);
    } else {
      dispatch(setSearchValue(value));
      setIsFocused(false);
    }
  };

  const handleClickHint = (index: number, value: string) => {
    if (data) {
      setValue(value);
      dispatch(setSearchValue(data.hints[index].term));
      setIsFocused(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && data) {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < data.hints.length ? nextIndex : prevIndex;
      });
    } else if (e.key === 'ArrowUp' && data) {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => {
        const nextIndex = prevIndex - 1;
        return nextIndex >= 0 ? nextIndex : prevIndex;
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitSearch();
    }
  };

  return (
    <div className={styles.form}>
      <input
        value={value}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
        className={styles.input}
        placeholder="Введите ваш запрос..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          timeoutRef.current = setTimeout(() => setIsFocused(false), 1000);
        }}
      ></input>
      <div onClick={handleSubmitSearch} className={styles.inputLoop}>
        <SearchLoop />
      </div>
      {/* {data && data.hints.length > 0 && false && ( */}
      {data && data.hints.length > 0 && !isError && (
        <div
          className={cn(styles.hints, {
            [styles.hintsActive]: isFocused,
          })}
        >
          {data.hints.map((item, index) => {
            return (
              <Typography
                onClick={() => handleClickHint(index, item.term)}
                weight="medium"
                color="black"
                className={cn(styles.hintTitle, {
                  [styles.hintTitleActive]: index === selectedSuggestionIndex,
                })}
                key={index}
              >
                {item.term}
                {/* Привет */}
              </Typography>
            );
          })}
        </div>
      )}
    </div>
  );
};
