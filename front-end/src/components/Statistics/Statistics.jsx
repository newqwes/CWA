import React from 'react';
import PropTypes from 'prop-types';
// import { floor } from 'lodash/fp';
// import { Button, Progress, Table } from 'antd';
import Chart from 'react-apexcharts';
import { Col, Row, Descriptions, Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { AgGridReact } from 'ag-grid-react';
import { chartData, columns, data } from './columns.jsx';

import { ChartWrapper, CHART_HEIGHT } from './styled';

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
    options: { labels: ['XRP', 'BTC', 'ETH', 'BLOK', 'SAMO'] },
    series: [30.46, 4.32, 6.77, 2.23, 6.34],
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
    // const { score, handleRefresh } = this.props;
    // const { percent, refreshTimer } = this.state;

    return (
      <div style={{ height: '100%' }}>
        {/* <div>score: {score}</div>
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
        </div> */}
        <Descriptions title='Последняя обновленная статистика'>
          <Row gutter={16}>
            <Col span={3}>
              <Statistic title='Всего вложил:' value={985.32} precision={2} suffix='$' />
            </Col>
            <Col span={9}>
              <Statistic
                title='Чистая прибыль'
                value={35.43}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix='$'
              />
            </Col>
            <Col span={3}>
              <Statistic title='Состояние кошелька:' value={1028.71} precision={2} suffix='$' />
            </Col>

            <Col span={3}>
              <Statistic
                title='Проценты'
                value={2.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix='%'
              />
            </Col>
          </Row>
        </Descriptions>
        <ChartWrapper>
          <Col span={12}>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type='donut'
              height={CHART_HEIGHT}
            />
          </Col>
          <Col span={12}>
            <Chart
              options={chartData.options}
              series={chartData.series}
              type='area'
              height={CHART_HEIGHT}
            />
          </Col>
        </ChartWrapper>

        <div className='ag-theme-material'>
          <AgGridReact columnDefs={columns} rowData={data} domLayout='autoHeight' />
        </div>
      </div>
    );
  }
}

export default Statistics;
