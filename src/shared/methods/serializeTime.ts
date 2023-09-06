export const serializeTime = (time: number) => {
  if (time > 0) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.ceil(time - minutes * 60 - 1);
    return seconds >= 10 ? `0${minutes}:${seconds}` : `0${minutes}:0${seconds}`;
  } else return '00:00';
};
