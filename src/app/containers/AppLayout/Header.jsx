import React, { memo } from 'react';
import { StyledHeader } from './styles';
import Menu from 'app/components/Menu';
import Avatar from 'app/components/Avatar';
import Dropdown from 'app/components/Dropdown';
import { useInjectSaga } from 'utils/reduxInjectors';
import { useLogout } from 'app/containers/Authentication/hooks';
import sagaAuthentication from 'app/containers/Authentication/saga';
import { sliceKey } from 'app/containers/Authentication/slice';
import { Link } from 'react-router-dom';

export const Header = () => {
  useInjectSaga({ key: sliceKey, saga: sagaAuthentication });
  const { handlers } = useLogout();
  const { onLogout } = handlers;

  return (
    <StyledHeader>
      <div className="left">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="right">
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item>
                <Link to="/profile">Profile</Link>
              </Menu.Item>
              <Menu.Item onClick={onLogout}>Logout</Menu.Item>
            </Menu>
          }
        >
          <Avatar />
        </Dropdown>
      </div>
    </StyledHeader>
  );
};

export default memo(Header);
