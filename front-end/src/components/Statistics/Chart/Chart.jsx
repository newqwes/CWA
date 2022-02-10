import React from 'react';
import PropTypes from 'prop-types';
import Apexchar from 'react-apexcharts';
import { Col } from 'antd';

import { ChartWrapper, CHART_HEIGHT } from './styled';

const Chart = ({ chartData }) => {
  const { donut, area } = chartData;

  return (
    <ChartWrapper>
      <Col span={7}>
        <Apexchar
          options={donut.options}
          series={donut.series}
          type='donut'
          height={CHART_HEIGHT}
        />
      </Col>
      <Col span={16} offset={1}>
        <Apexchar options={area.options} series={area.series} type='area' height={CHART_HEIGHT} />
      </Col>
    </ChartWrapper>
  );
};

Chart.propTypes = {
  chartData: PropTypes.object.isRequired,
};

export default React.memo(Chart);
