import styled from 'styled-components';
import { Row, Typography } from 'antd';

const { Text: TextAntd } = Typography;

export const CHART_HEIGHT = 350;

export const ChartWrapper = styled(Row)`
  margin: 40px 0;
`;

export const Text = styled(TextAntd)`
  display: block;
  margin-bottom: 8px;
`;
