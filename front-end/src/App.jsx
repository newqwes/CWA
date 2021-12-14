import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { SketchOutlined } from '@ant-design/icons';

import SideMenuContainer from './containers/SideMenuContainer';
import AuthContainer from './containers/AuthContainer';
import LogoutContainer from './containers/LogoutContainer';

import Header from './components/Header';

import { AppWrapper, Logo } from './style/AppWrapper';

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
    const { handleCollapseSideMenu, collapsedSideMenu, authorized } = this.props;

    return (
      <AppWrapper>
        <Sider collapsible collapsed={collapsedSideMenu} onCollapse={handleCollapseSideMenu}>
          <Logo collapsedSideMenu={collapsedSideMenu}>
            <SketchOutlined />
            <p>CryptoWalletAnalytics</p>
          </Logo>
          <SideMenuContainer />
        </Sider>
        <Layout>
          <Header>{authorized ? <LogoutContainer /> : <AuthContainer />}</Header>
          <Content style={{ margin: '0 16px' }}>
            <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
              Здесь будет статистика.
            </div>
          </Content>
        </Layout>
      </AppWrapper>
    );
  }
}

export default App;
