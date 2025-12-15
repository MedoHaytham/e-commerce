import React from 'react';
import { Outlet } from 'react-router-dom';
import TopHeader from '../components/header/topHeader';
import BtmHeader from '../components/header/btmHeader';

const RootLayout = () => {
  return ( 
    <>
      <header>
        <TopHeader />
        <BtmHeader />
      </header>
      <Outlet />
    </>
  );
}

export default RootLayout;