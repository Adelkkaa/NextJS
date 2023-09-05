import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';
import { SearchLoop } from './icons/SearchLoop';
import { shazamApi } from 'redux/services/shazamService';
import { useDebounce } from 'shared/hooks/useDebounce';
import { Typography } from '../Typography';
import cn from 'classnames';

// Запрос закоменчен лишь потому что на дебаге уходит много запросов, а максималка = 500 в месяц

export const SearchInput = () => {
  const [value, setValue] = useState('');
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const debouncedSearchTerm = useDebounce(value, 300);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  // const { data, isLoading, isError } = shazamApi.useFetchAutoCompleteQuery({
  //   term: debouncedSearchTerm,
  // });
  const data = { hints: [{ term: '' }] };

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
    } else if (e.key === 'Enter' && data) {
      e.preventDefault();
      setValue(data.hints[selectedSuggestionIndex].term);
      setSelectedSuggestionIndex(-1);
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
      ></input>
      <div className={styles.inputLoop}>
        <SearchLoop />
      </div>
      {/* {data && data.hints.length > 0 && !isError && */}
      {data && data.hints.length > 0 && false && (
        <div className={styles.hints}>
          {data.hints.map((item, index) => {
            return (
              <Typography
                onClick={() => setValue(item.term)}
                weight="medium"
                color="black"
                className={cn(styles.hintTitle, {
                  [styles.hintTitleActive]: index === selectedSuggestionIndex,
                })}
                key={index}
              >
                {/* {item.term} */}
                Привет
              </Typography>
            );
          })}
        </div>
      )}
    </div>
  );
};
