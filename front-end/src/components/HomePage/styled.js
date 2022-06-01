import { get } from 'lodash/fp';
import styled from 'styled-components';

import { Button as AntButton } from 'antd';

export const Button = styled(AntButton)`
  padding: 15px;
  font-size: 16px;
`;

export const UserNameWrapper = styled.span`
  color: ${get(['theme', 'negative'])};
`;
