import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Layout, Result } from 'antd';
import { SketchOutlined } from '@ant-design/icons';

import SideMenuContainer from './containers/SideMenuContainer';
import AuthContainer from './containers/AuthContainer';
import LogoutContainer from './containers/LogoutContainer';
// import StatisticsContainer from './containers/StatisticsContainer';
import UsersContainer from './containers/UsersContainer';
import ChatContainer from './containers/ChatContainer';
import HeaderContainer from './containers/HeaderContainer';

import { AppWrapper, Logo, Owerlay, ContentWrapper } from './style/AppWrapper';
import { DEFAULT_SELECTED_MENU, MENU_KEYS } from './constants/menu';
import GitHelperComponent from './components/GitHelperComponent';

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
        <Sider
          collapsedWidth={0}
          collapsible
          collapsed={collapsedSideMenu}
          zeroWidthTriggerStyle={{ width: 0 }}
          onCollapse={handleCollapseSideMenu}>
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
            <div>
              {authorized ? (
                <ContentWrapper>
                  {/* <Route exact
                  path={MENU_KEYS.statistics} component={StatisticsContainer} /> */}
                  <Route exact path={MENU_KEYS.users} component={UsersContainer} />
                  <Route exact path={MENU_KEYS.chat} component={ChatContainer} />
                  <Route path='/git' component={GitHelperComponent} />
                </ContentWrapper>
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
