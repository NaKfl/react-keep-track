import React, { memo } from 'react';
import { StyledHeader } from './styles';
import Menu from 'app/components/Menu';

export const Header = () => {
  return (
    <StyledHeader>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Dashboard</Menu.Item>
        <Menu.Item key="2">Teams</Menu.Item>
        <Menu.Item key="3">Analytics</Menu.Item>
        <Menu.Item key="4">Billing</Menu.Item>
      </Menu>
    </StyledHeader>
  );
};

export default memo(Header);
