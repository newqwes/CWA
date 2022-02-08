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

    img {
      height: 24px;
      margin: 0 5px 4px 0;
    }
  }
`;
