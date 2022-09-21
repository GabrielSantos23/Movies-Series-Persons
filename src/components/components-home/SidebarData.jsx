import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as bsIcons from 'react-icons/bs';
import * as GrIcons from 'react-icons/gr';
export const SidebarData = [
  {
    title: 'New Releases',
    path: '/',
    icon: <GrIcons.GrHomeRounded />,
    arrow: <bsIcons.BsArrowRight />,
  },
  {
    title: 'Trending',
    path: '/trending',
    icon: <IoIcons.IoIosPaper />,
    arrow: <bsIcons.BsArrowRight />,
  },
  {
    title: 'Coming Soon',
    path: '/coming-Soon',
    icon: <IoIcons.IoIosPaper />,
    arrow: <bsIcons.BsArrowRight />,
  },
  {
    title: 'Favourites',
    path: '/favourites',
    icon: <IoIcons.IoIosPaper />,
    arrow: <bsIcons.BsArrowRight />,
  },
  {
    title: 'Watch Later',
    path: '/watch-Later',
    icon: <IoIcons.IoIosPaper />,
    arrow: <bsIcons.BsArrowRight />,
  },
];
