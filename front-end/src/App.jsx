import React from 'react';
import PropTypes from 'prop-types';
import { floor } from 'lodash/fp';
import { Button, Layout, Progress } from 'antd';
import { SketchOutlined } from '@ant-design/icons';

import SideMenuContainer from './containers/SideMenuContainer';
import AuthContainer from './containers/AuthContainer';
import LogoutContainer from './containers/LogoutContainer';

import Header from './components/Header';

import { AppWrapper, Logo, Owerlay } from './style/AppWrapper';

const { Content, Sider } = Layout;

const UPDATE_TIMER_MILLISECONDS = 200;

class App extends React.Component {
  static propTypes = {
    handleCollapseSideMenu: PropTypes.func.isRequired,
    getAutharizationStatus: PropTypes.func.isRequired,
    handleRefresh: PropTypes.func.isRequired,
    collapsedSideMenu: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    authorized: PropTypes.bool.isRequired,
    lastDateUpdate: PropTypes.string,
    score: PropTypes.number,
    dataRefreshLimitPerMinute: PropTypes.number,
  };

  state = {
    refreshTimer: 20,
    percent: 0,
  };

  componentDidMount() {
    const { getAutharizationStatus } = this.props;

    getAutharizationStatus();
  }

  componentDidUpdate(prevProps) {
    const { lastDateUpdate, dataRefreshLimitPerMinute } = this.props;

    this.transition();

    if (prevProps.lastDateUpdate !== lastDateUpdate) {
      const refreshTimer = Date.now() - Date.parse(lastDateUpdate);

      this.setState({ refreshTimer });
    }

    if (dataRefreshLimitPerMinute) {
      this.timer = setTimeout(this.tick, UPDATE_TIMER_MILLISECONDS);
    }
  }

  tick = () => {
    const { refreshTimer } = this.state;
    const { dataRefreshLimitPerMinute } = this.props;

    if (refreshTimer < 0 || refreshTimer > dataRefreshLimitPerMinute * 60 * 1000) {
      this.transition();
    } else {
      const percent = (refreshTimer * 100) / (dataRefreshLimitPerMinute * 60 * 1000);

      this.setState({ refreshTimer: refreshTimer + UPDATE_TIMER_MILLISECONDS, percent });
    }
  };

  transition() {
    clearInterval(this.timer);
  }

  render() {
    const { handleCollapseSideMenu, collapsedSideMenu, authorized, loading, score, handleRefresh } =
      this.props;

    const { percent, refreshTimer } = this.state;

    return (
      <AppWrapper loading={loading.toString()}>
        <Sider collapsible collapsed={collapsedSideMenu} onCollapse={handleCollapseSideMenu}>
          <Logo collapsed={collapsedSideMenu}>
            <SketchOutlined />
            <p>CryptoWalletAnalytics</p>
          </Logo>
          <SideMenuContainer />
        </Sider>
        <Layout>
          <Header>{authorized ? <LogoutContainer /> : <AuthContainer />}</Header>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              {authorized ? (
                <div>
                  <div>score: {score}</div>
                  <div>
                    <Progress
                      type='circle'
                      percent={percent}
                      status='active'
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                      format={() => (
                        <Button onClick={handleRefresh} type='primary'>
                          {floor(refreshTimer / 1000)} сек.
                        </Button>
                      )}
                    />
                  </div>
                </div>
              ) : (
                'Нет доступа!'
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
