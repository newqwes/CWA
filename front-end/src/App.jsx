import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { SketchOutlined } from '@ant-design/icons';

import SideMenuContainer from './containers/SideMenuContainer';
import AuthContainer from './containers/AuthContainer';
import LogoutContainer from './containers/LogoutContainer';
import StatisticsContainer from './containers/StatisticsContainer';
import UsersContainer from './containers/UsersContainer';
import ChatContainer from './containers/ChatContainer';
import HeaderContainer from './containers/HeaderContainer';
import GitContainer from './containers/GitContainer';
import HomePageContainer from './containers/HomePageContainer';

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
              <p>CryptoWalletAnalytics</p>
            </Logo>
          </Link>
          <SideMenuContainer />
        </Sider>
        <Layout>
          <HeaderContainer>{authorized ? <LogoutContainer /> : <AuthContainer />}</HeaderContainer>
          <Content>
            <ContentWrapper>
              <Route exact path={MENU_KEYS.home} component={HomePageContainer} />
              <Route exact path={MENU_KEYS.statistics} component={StatisticsContainer} />
              <Route exact path={MENU_KEYS.users} component={UsersContainer} />
              <Route exact path={MENU_KEYS.chat} component={ChatContainer} />
              <Route exact path={MENU_KEYS.git} component={GitContainer} />
            </ContentWrapper>
          </Content>
        </Layout>
        <Owerlay />
      </AppWrapper>
    );
  }
}

export default App;
