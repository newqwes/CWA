import React, { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { SketchOutlined } from '@ant-design/icons';

import AuthContainer from './containers/AuthContainer';
import StatisticsContainer from './containers/StatisticsContainer';
import UsersContainer from './containers/UsersContainer';
import ChatContainer from './containers/ChatContainer';
import HeaderContainer from './containers/HeaderContainer';
import CalculatorContainer from './containers/CalculatorContainer';
import HomePageContainer from './containers/HomePageContainer';
import PrivateRoute from './components/PrivateRoute';
import SideMenu from './components/SideMenu';
import AvatarMenuContainer from './containers/AvatarMenuContainer';

import { AppWrapper, ContentWrapper, Logo, Owerlay } from './style/AppWrapper';
import { DEFAULT_SELECTED_MENU, MENU_KEYS } from './constants/menu';
import ProfileContainer from './containers/ProfileContainer';
import SettingsContainer from './containers/SettingsContainer';
import socket from './api/socket';

const { Content, Sider } = Layout;

const App = ({
  handleCollapseSideMenu,
  getAutharizationStatus,
  collapsedSideMenu,
  loading,
  authorized,
  setBankValue,
}) => {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState('');

  useEffect(() => {
    socket.on('bank', setBankValue);
  }, []);

  useEffect(() => {
    setCurrentRoute(
      location.pathname === '/' ? MENU_KEYS.statistics : location.pathname,
    );
    getAutharizationStatus();
  }, [getAutharizationStatus]);

  return (
    <AppWrapper loading={loading.toString()}>
      <Sider
        collapsible
        collapsed={collapsedSideMenu}
        onCollapse={handleCollapseSideMenu}
        collapsedWidth="0"
      >
        <Link to={DEFAULT_SELECTED_MENU}>
          <Logo collapsed={collapsedSideMenu}>
            <SketchOutlined />
            <p>Crypto Wallet Analytics</p>
          </Logo>
        </Link>
        <SideMenu />
      </Sider>
      <Layout>
        <HeaderContainer>
          {authorized ? <AvatarMenuContainer /> : <AuthContainer />}
        </HeaderContainer>
        <Content>
          <ContentWrapper>
            <Routes>
              <Route
                path={'/'}
                element={
                  authorized ? (
                    <Navigate to={currentRoute} replace={true} />
                  ) : (
                    <HomePageContainer />
                  )
                }
              />
            </Routes>
            <PrivateRoute
              path={MENU_KEYS.home}
              component={HomePageContainer}
              authorized={authorized}
            />
            <PrivateRoute
              path={MENU_KEYS.statistics}
              component={StatisticsContainer}
              authorized={authorized}
            />
            <PrivateRoute
              path={MENU_KEYS.users}
              component={UsersContainer}
              authorized={authorized}
            />
            <PrivateRoute
              path={MENU_KEYS.chat}
              component={ChatContainer}
              authorized={authorized}
            />
            <PrivateRoute
              path={MENU_KEYS.calculator}
              component={CalculatorContainer}
              authorized={authorized}
            />
            <PrivateRoute
              path={MENU_KEYS.profile}
              component={ProfileContainer}
              authorized={authorized}
            />
            <PrivateRoute
              path="settings"
              component={SettingsContainer}
              authorized={authorized}
            />
          </ContentWrapper>
        </Content>
      </Layout>
      <Owerlay />
    </AppWrapper>
  );
};

App.propTypes = {
  handleCollapseSideMenu: PropTypes.func.isRequired,
  getAutharizationStatus: PropTypes.func.isRequired,
  collapsedSideMenu: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  authorized: PropTypes.bool.isRequired,
  setBankValue: PropTypes.func.isRequired,
};

export default App;
