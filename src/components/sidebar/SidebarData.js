import React from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Overview',
    path: '/',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'DeFi',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Leading',
        path: '/leading',
      },
      {
        title: 'Leasing',
        path: '/leasing',
      }
    ]
  },
  {
    title: 'Portfolio',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Assets',
        path: '/assets',
      },
      {
        title: 'Defi',
        path: '/defi',
      }
    ]
  },
  {
    title: 'Market Overview',
  },
  {
    title: 'Issue NFT',
    path: '/issue_nft',
  }
];