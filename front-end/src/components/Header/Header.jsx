import React from 'react';
import PropTypes from 'prop-types';
import { floor } from 'lodash/fp';

import { HeaderWrapper, Button, Text, Title } from './styled';

const UPDATE_TIMER_MILLISECONDS = 1000;

class Header extends React.Component {
  static propTypes = {
    handleRefresh: PropTypes.func.isRequired,
    lastDateUpdate: PropTypes.string,
    score: PropTypes.number,
    dataRefreshLimitPerMinute: PropTypes.number,
    children: PropTypes.node.isRequired,
    authorized: PropTypes.bool.isRequired,
  };

  state = {
    refreshTimer: 0,
    refreshDisabled: false,
  };

  componentDidUpdate(prevProps) {
    const { lastDateUpdate, dataRefreshLimitPerMinute } = this.props;

    if (lastDateUpdate !== prevProps.lastDateUpdate) {
      const refreshTimer =
        (Date.parse(lastDateUpdate) + dataRefreshLimitPerMinute * 60 * 1000 - Date.now()) / 1000;

      if (refreshTimer <= 0) {
        return;
      }

      this.setState({ refreshTimer, refreshDisabled: true });

      this.timer = setTimeout(this.tick, UPDATE_TIMER_MILLISECONDS);
    }
  }

  componentWillUnmount() {
    this.transition();
  }

  tick = () => {
    const { refreshTimer } = this.state;

    this.transition();

    if (refreshTimer <= 1) {
      this.setState({ refreshTimer: 0, refreshDisabled: false });
    } else {
      this.setState({
        refreshTimer: refreshTimer - 1,
        refreshDisabled: true,
      });

      this.timer = setTimeout(this.tick, UPDATE_TIMER_MILLISECONDS);
    }
  };

  transition() {
    clearInterval(this.timer);
  }

  render() {
    const { score, handleRefresh, children, authorized } = this.props;
    const { refreshTimer, refreshDisabled } = this.state;

    return (
      <HeaderWrapper>
        {/* NOTE: Separate to component like name CountScore */}
        {authorized && (
          <>
            <Title level={4}>score: {score}</Title>
            {refreshDisabled ? (
              <Text>{floor(refreshTimer)} сек.</Text>
            ) : (
              <div>
                <Button
                  onClick={handleRefresh}
                  type='primary'
                  loading={refreshDisabled}
                  disabled={refreshDisabled}>
                  Клик
                </Button>
              </div>
            )}
          </>
        )}
        {children}
      </HeaderWrapper>
    );
  }
}

export default Header;
