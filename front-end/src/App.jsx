import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import { AppWrapper, Logo } from './style/AppWrapper';
import SideMenu from './components/SideMenu';
import Header from './components/Header';
import AuthContainer from './containers/AuthContainer';

const { Content, Sider } = Layout;

class App extends React.Component {
  static propTypes = {
    handleCollapseSideMenu: PropTypes.func.isRequired,
    collapsedSideMenu: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    authorized: PropTypes.bool.isRequired,
  };

  render() {
    const { handleCollapseSideMenu, collapsedSideMenu } = this.props;

    return (
      <AppWrapper>
        <Sider collapsible collapsed={collapsedSideMenu} onCollapse={handleCollapseSideMenu}>
          <Logo>CWA Logo</Logo>
          <SideMenu />
        </Sider>
        <Layout>
          <Header>
            <AuthContainer />
          </Header>
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
