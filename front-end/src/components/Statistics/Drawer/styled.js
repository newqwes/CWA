import styled from 'styled-components';
import { get } from 'lodash/fp';
import { Typography, Statistic } from 'antd';

const { Text: TextAntd } = Typography;

export const Text = styled(TextAntd)`
  display: block;
  margin-bottom: 8px;
`;

export const InteractiveStatistic = styled(Statistic)`
  .ant-statistic-content {
    color: ${({ positive, theme }) => get([positive ? 'positive' : 'negative'], theme)};
  }
`;
