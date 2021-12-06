import React from 'react';
import { Layout } from 'antd';

import { AppWrapper, Logo } from './style/AppWrapper';
import SideMenu from './components/SideMenu';
import HeaderContainer from './containers/HeaderContainer';

const { Content, Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;

    return (
      <AppWrapper>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Logo>CWA Logo</Logo>
          <SideMenu />
        </Sider>
        <Layout>
          <HeaderContainer />
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
