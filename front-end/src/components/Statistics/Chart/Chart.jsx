import React from 'react';
import PropTypes from 'prop-types';
import Apexchar from 'react-apexcharts';
import { Col, Carousel } from 'antd';
import { AppstoreOutlined, AreaChartOutlined } from '@ant-design/icons';

import { ChartWrapper, Segmented, CHART_HEIGHT } from './styled';

class Chart extends React.Component {
  static propTypes = {
    chartData: PropTypes.object.isRequired,
  };

  refSlider = slider => {
    this.slider = slider;
  };

  onChangeSegmented = segment => {
    this.slider.goTo(segment);
  };

  render() {
    const { donut, area, treemap } = this.props.chartData;

    return (
      <ChartWrapper>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={9}>
          <Apexchar options={donut.options} series={donut.series} type='donut' height='450' />
        </Col>
        <Col align='center' xs={24} sm={24} md={24} lg={24} xl={12} xxl={{ span: 14, offset: 1 }}>
          <Segmented
            onChange={this.onChangeSegmented}
            options={[
              {
                label: 'График',
                value: '0',
                icon: <AreaChartOutlined />,
              },
              {
                label: 'Мазайка',
                value: '1',
                icon: <AppstoreOutlined />,
              },
            ]}
          />
          <Carousel dots={false} ref={this.refSlider}>
            <Apexchar
              options={area.options}
              series={area.series}
              type='area'
              height={CHART_HEIGHT}
            />
            <Apexchar
              options={treemap.options}
              series={treemap.series}
              type='treemap'
              height={CHART_HEIGHT}
            />
          </Carousel>
        </Col>
      </ChartWrapper>
    );
  }
}

export default Chart;
