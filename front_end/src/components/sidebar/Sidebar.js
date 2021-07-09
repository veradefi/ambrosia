// Copyright 2021 Vera http://vera.financial/
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SidebarData } from '../sidebar/SidebarData';
import SubMenu from '../sidebar/SubMenu';
import '../home/Home.css';


const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

function Sidebar() {

  return (
    <>
      <div className="sidebar-heading mt-5">Polka Dot </div>
      <div className="list-group list-group-flush">
        <SidebarWrap>
          <NavIcon to='/' />

          {SidebarData.map((item,index) => {
            return <SubMenu item={item} key={index} />;
          })}
        </SidebarWrap>
      </div>
    </>
  )
}

export default Sidebar;
