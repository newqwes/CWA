import styled from 'styled-components';
import { get } from 'lodash/fp';
import { Statistic, Typography } from 'antd';

const { Text: TextAntd } = Typography;

export const Text = styled(TextAntd)`
  display: block;
  margin-bottom: 8px;
`;

export const InteractiveStatistic = styled(Statistic)`
  .ant-statistic-content {
    color: ${({ positive, theme }) =>
      get([positive ? 'positive' : 'negative'], theme)};

    img {
      height: 24px;
      margin: 0 5px 4px 0;

      @media (max-width: 1000px) {
        height: 68px;
        margin: 0 15px 4px 0;
      }
    }
  }
`;

export const InteractiveDescriptions = styled.div`
  display: flex;
  justify-content: space-between;

  .show-for-mobile {
    display: none;
  }

  .hoverable {
    .ant-statistic-content:hover {
      cursor: pointer;
      user-select: none;
    }
  }

  @media (max-width: 1000px) {
    flex-wrap: wrap;
    margin-top: 40px;

    .show-for-mobile {
      display: flex;
    }

    .hide-for-mobile {
      display: none;
    }

    .ant-statistic-content,
    .ant-statistic-title {
      font-size: 48px;
      font-weight: bold;
    }

    .ant-radio-button-wrapper {
      height: 64px;
      font-size: 38px;
      line-height: 64px;
    }

    .refresh-button {
      height: 200px;
      font-size: 50px;
    }
  }
`;
export const Properties = styled.div``;

export const Property = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 1000px) {
    flex: 32%;
  }

  margin: 35px;
`;
