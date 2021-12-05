import styled from 'styled-components';
import { Layout } from 'antd';
import { get } from 'lodash/fp';

export const AppWrapper = styled(Layout)`
  min-height: 100vh;
`;

export const Logo = styled(Layout)`
  height: 32px;
  margin: 16px;

  background: ${get(['theme', 'icon', 'color', 'warning'])};
  text-align: center;
`;
