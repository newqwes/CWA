import React from 'react';
import PropTypes from 'prop-types';
import { floor } from 'lodash/fp';
import { Button, Progress } from 'antd';

const UPDATE_TIMER_MILLISECONDS = 200;

// TODO: Refactor all
class Statistics extends React.Component {
  static propTypes = {
    handleRefresh: PropTypes.func.isRequired,
    lastDateUpdate: PropTypes.string,
    score: PropTypes.number,
    dataRefreshLimitPerMinute: PropTypes.number,
  };

  state = {
    refreshTimer: 0,
    percent: 0,
  };

  componentDidMount() {
    const { lastDateUpdate, dataRefreshLimitPerMinute } = this.props;

    this.transition();

    const refreshTimer = Date.now() - Date.parse(lastDateUpdate);

    if (refreshTimer > dataRefreshLimitPerMinute * 60 * 1000) {
      return;
    }

    this.setState({ refreshTimer });

    if (dataRefreshLimitPerMinute) {
      this.timer = setTimeout(this.tick, UPDATE_TIMER_MILLISECONDS);
    }
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

  componentWillUnmount() {
    this.transition();
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
    const { score, handleRefresh } = this.props;
    const { percent, refreshTimer } = this.state;

    return (
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
    );
  }
}

export default Statistics;
