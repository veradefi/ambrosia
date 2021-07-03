import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  transition: all 0.25s ease 0.2s;
  &:hover {
    background:  linear-gradient(150deg, #1F64D2 4.28%, #52CCE7 58.39%, #89ECD4 96.37%);
    border-left: 4px solid #632ce4;
    cursor: pointer;
    color: white;
    text-decoration: none;
    transition: all 0.25s ease 0.2s;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background:  rgb(39, 40, 64);
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  transition: all 0.25s ease 0.2s;
  &:hover {
    ${'' /* background: #252831; */}
    background:  linear-gradient(150deg, #1F64D2 4.28%, #52CCE7 58.39%, #89ECD4 96.37%);
    cursor: pointer;
    color: white;
    text-decoration: none;
    transition: all 0.25s ease 0.2s;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;