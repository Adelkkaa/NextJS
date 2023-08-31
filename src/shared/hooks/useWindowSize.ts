import { useState, useMemo } from 'react';
import throttle from 'lodash.throttle';
import useEventListener from './useEventListener';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface WindowSize {
  width: number;
  height: number;
}
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleSize = useMemo(() => {
    return throttle(() => {
      setWindowSize({
        width: window.outerWidth,
        height: window.innerHeight,
      });
    }, 300);
  }, [setWindowSize]);

  useEventListener('resize', handleSize);
  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowSize;
};
