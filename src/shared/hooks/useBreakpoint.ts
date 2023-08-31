import { useWindowSize } from './useWindowSize';
import mediaVariables from '@styles/variables/_export.module.scss';

type WidthRange = {
  min: number;
  max: number;
};

// todo разобраться почему isPortraitMobile и isLandscapeMobile отрабатывают неправильно
// Нужно менять useWindowSize, ибо < 600 он уже не цепляется

class AppLayoutService {
  constructor(
    readonly breakpoints: {
      portraitMobile: WidthRange;
      landscapeMobile: WidthRange;
      portraitTablet: WidthRange;
      landscapeTablet: WidthRange;
      laptop: WidthRange;
      desktop: WidthRange;
    },
  ) {}

  isPortraitMobile(width: number) {
    return this.compare(width, this.breakpoints.portraitMobile);
  }
  isLandscapeMobile(width: number) {
    return this.compare(width, this.breakpoints.landscapeMobile);
  }
  isPortraitTablet(width: number) {
    return this.compare(width, this.breakpoints.portraitTablet);
  }
  isLandscapeTablet(width: number) {
    return this.compare(width, this.breakpoints.landscapeTablet);
  }
  isLaptop(width: number) {
    return this.compare(width, this.breakpoints.laptop);
  }
  isDesktop(width: number) {
    return this.compare(width, this.breakpoints.desktop);
  }

  private compare(width: number, range: WidthRange) {
    return width <= range.max;
  }

  getAll(width: number) {
    return {
      isPortraitMobile: this.isPortraitMobile(width),
      isLandscapeMobile: this.isLandscapeMobile(width),
      isPortraitTablet: this.isPortraitTablet(width),
      isLandscapeTablet: this.isLandscapeTablet(width),
      isLaptop: this.isLaptop(width),
      isDesktop: this.isDesktop(width),
    };
  }
}

const appLayoutService = new AppLayoutService({
  portraitMobile: {
    min: +mediaVariables['minPortraitMobile'],
    max: +mediaVariables['maxPortraitMobile'],
  },
  landscapeMobile: {
    min: +mediaVariables['minLandscapeMobile'],
    max: +mediaVariables['maxLandscapeMobile'],
  },
  portraitTablet: {
    min: +mediaVariables['minPortraitTablet'],
    max: +mediaVariables['maxPortraitTablet'],
  },
  landscapeTablet: {
    min: +mediaVariables['minLandscapeTablet'],
    max: +mediaVariables['maxLandscapeTablet'],
  },
  laptop: { min: +mediaVariables['minLaptop'], max: +mediaVariables['maxLaptop'] },
  desktop: { min: +mediaVariables['minDesktop'], max: +mediaVariables['maxDesktop'] },
});

export const useBreakpoint = () => {
  const { width } = useWindowSize();
  //   console.log(width);
  return appLayoutService.getAll(width);
};
