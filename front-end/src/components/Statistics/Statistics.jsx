import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { Col, Row, Descriptions, Statistic, Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { AgGridReact } from 'ag-grid-react';
import { chartData, columns, data, defaultColDef, frameworkComponents } from './columns';

import { ChartWrapper, Text, CHART_HEIGHT } from './styled';

class Statistics extends React.Component {
  static propTypes = {
    setOrder: PropTypes.func.isRequired,
    getOrders: PropTypes.func.isRequired,
  };

  state = {
    options: { labels: ['XRP', 'BTC', 'ETH', 'BLOK', 'SAMO'] },
    series: [30.46, 4.32, 6.77, 2.23, 6.34],
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
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
            <Col span={4}>
              <Statistic title='Всего транзакций' value={4} />
            </Col>
            <Col span={2}>
              <Text type='secondary'>Транзакция</Text>
              <Button type='primary'>Добавить</Button>
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
          <AgGridReact
            columnDefs={columns}
            rowData={data}
            domLayout='autoHeight'
            defaultColDef={defaultColDef}
            frameworkComponents={frameworkComponents}
          />
        </div>
      </div>
    );
  }
}

export default Statistics;
