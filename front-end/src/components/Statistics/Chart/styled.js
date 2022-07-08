import styled from 'styled-components';
import { Row, Segmented as SegmentedAnt } from 'antd';

export const CHART_HEIGHT = '370';

export const ChartWrapper = styled(Row)`
  margin: 50px 0;
`;

export const Segmented = styled(SegmentedAnt)`
  margin-bottom: 15px;
  text-align: center;
`;
