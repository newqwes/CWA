import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Layout, Result } from 'antd';
import { SketchOutlined } from '@ant-design/icons';

import SideMenuContainer from './containers/SideMenuContainer';
import AuthContainer from './containers/AuthContainer';
import LogoutContainer from './containers/LogoutContainer';
import StatisticsContainer from './containers/StatisticsContainer';
import UsersContainer from './containers/UsersContainer';
import ChatContainer from './containers/ChatContainer';
import HeaderContainer from './containers/HeaderContainer';

import { AppWrapper, Logo, Owerlay } from './style/AppWrapper';
import { DEFAULT_SELECTED_MENU, MENU_KEYS } from './constants/menu';

const { Content, Sider } = Layout;

class App extends React.Component {
  static propTypes = {
    handleCollapseSideMenu: PropTypes.func.isRequired,
    getAutharizationStatus: PropTypes.func.isRequired,
    handleShowAuthModal: PropTypes.func.isRequired,
    collapsedSideMenu: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    authorized: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { getAutharizationStatus } = this.props;

    getAutharizationStatus();
  }

  render() {
    const { handleCollapseSideMenu, collapsedSideMenu, authorized, loading, handleShowAuthModal } =
      this.props;

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
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              {authorized ? (
                <>
                  <Route exact path={MENU_KEYS.statistics} component={StatisticsContainer} />
                  <Route exact path={MENU_KEYS.users} component={UsersContainer} />
                  <Route exact path={MENU_KEYS.chat} component={ChatContainer} />
                  <Redirect from='/' to={DEFAULT_SELECTED_MENU} />
                </>
              ) : (
                <Result
                  status='403'
                  title='403'
                  subTitle='Извините, у вас нет прав доступа к этой странице.'
                  extra={
                    <Button onClick={handleShowAuthModal} type='primary'>
                      Войти
                    </Button>
                  }
                />
              )}
            </div>
          </Content>
        </Layout>
        <Owerlay />
      </AppWrapper>
    );
  }
}

export default App;
