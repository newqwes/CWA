import { GoogleOutlined as ANTGoogleOutlined } from '@ant-design/icons';
import { get } from 'lodash/fp';
import styled from 'styled-components';

export const GoogleOutlined = styled(ANTGoogleOutlined)`
  font-size: 36px;
  margin-left: calc(50% - 18px);
  color: ${get(['theme', 'accent'])};
`;
