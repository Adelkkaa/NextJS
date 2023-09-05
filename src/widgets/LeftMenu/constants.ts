import homeIcon from '@images/HomePage/homeIcon.svg';
import searchIcon from '@images/HomePage/searchIcon.svg';
import libraryIcon from '@images/HomePage/libraryIcon.svg';
import createPlaylistIcon from '@images/HomePage/createPlaylistIcon.svg';
import likedIcon from '@images/HomePage/likedIcon.svg';

export const menuItems = [
  {
    title: 'Home',
    icon: homeIcon,
    link: '/',
  },
  {
    title: 'Search',
    icon: searchIcon,
    link: '/search',
  },
  // {
  //   title: 'Your Library',
  //   icon: libraryIcon,
  //   link: '/library',
  // },
  // {
  //   title: 'Create Playlist',
  //   icon: createPlaylistIcon,
  //   link: '/newPlaylist',
  // },
  {
    title: 'Liked Songs',
    icon: likedIcon,
    link: '/liked',
  },
];
