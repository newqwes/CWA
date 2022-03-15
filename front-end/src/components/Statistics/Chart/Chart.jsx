import React from 'react';
import PropTypes from 'prop-types';
import Apexchar from 'react-apexcharts';
import { Col } from 'antd';

import { ChartWrapper, CHART_HEIGHT } from './styled';

const Chart = ({ chartData }) => {
  const { donut, area } = chartData;

  return (
    <ChartWrapper>
      <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={9}>
        <Apexchar
          options={donut.options}
          series={donut.series}
          type='donut'
          height={CHART_HEIGHT}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={{ span: 14, offset: 1 }}>
        <Apexchar options={area.options} series={area.series} type='area' height={CHART_HEIGHT} />
      </Col>
    </ChartWrapper>
  );
};

Chart.propTypes = {
  chartData: PropTypes.object.isRequired,
};

export default React.memo(Chart);
