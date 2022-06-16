import React from 'react';
import { Route, Link, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Layout } from 'antd';
import { SketchOutlined } from '@ant-design/icons';

import AuthContainer from './containers/AuthContainer';
import StatisticsContainer from './containers/StatisticsContainer';
import UsersContainer from './containers/UsersContainer';
import ChatContainer from './containers/ChatContainer';
import HeaderContainer from './containers/HeaderContainer';
import GitContainer from './containers/GitContainer';
import HomePageContainer from './containers/HomePageContainer';
import PrivateRoute from './components/PrivateRoute';
import SideMenu from './components/SideMenu';
import AvatarMenuContainer from './containers/AvatarMenuContainer';

import { AppWrapper, Logo, Owerlay, ContentWrapper } from './style/AppWrapper';
import { DEFAULT_SELECTED_MENU, MENU_KEYS } from './constants/menu';

const { Content, Sider } = Layout;

class App extends React.Component {
  static propTypes = {
    handleCollapseSideMenu: PropTypes.func.isRequired,
    getAutharizationStatus: PropTypes.func.isRequired,
    collapsedSideMenu: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    authorized: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { getAutharizationStatus } = this.props;

    getAutharizationStatus();
  }

  render() {
    const { handleCollapseSideMenu, collapsedSideMenu, authorized, loading } = this.props;

    return (
      <AppWrapper loading={loading.toString()}>
        <Sider collapsible collapsed={collapsedSideMenu} onCollapse={handleCollapseSideMenu}>
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
                    authorized ? <Navigate to={MENU_KEYS.statistics} /> : <HomePageContainer />
                  }
                />
                <Route path={MENU_KEYS.git} element={<GitContainer />} />
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
            </ContentWrapper>
          </Content>
        </Layout>
        <Owerlay />
      </AppWrapper>
    );
  }
}

export default App;
