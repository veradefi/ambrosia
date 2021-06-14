import React from 'react';
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
    path: "#",
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
    path: "#",
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
    title: 'Issue NFT',
    path: '/issue_nft',
  }
];