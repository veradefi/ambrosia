import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SidebarData } from '../sidebar/SidebarData';
import SubMenu from '../sidebar/SubMenu';

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => (
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

export default Sidebar;
