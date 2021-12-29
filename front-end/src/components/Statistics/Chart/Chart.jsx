import React from 'react';
import PropTypes from 'prop-types';
import Apexchar from 'react-apexcharts';
import { Col } from 'antd';

import { ChartWrapper, CHART_HEIGHT } from './styled';

class Chart extends React.Component {
  static propTypes = {
    chartData: PropTypes.object.isRequired,
  };

  render() {
    const {
      chartData: { donut, area },
    } = this.props;

    return (
      <ChartWrapper>
        <Col span={12}>
          <Apexchar
            options={donut.options}
            series={donut.series}
            type='donut'
            height={CHART_HEIGHT}
          />
        </Col>
        <Col span={12}>
          <Apexchar options={area.options} series={area.series} type='area' height={CHART_HEIGHT} />
        </Col>
      </ChartWrapper>
    );
  }
}

export default Chart;
