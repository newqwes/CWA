import styled from 'styled-components';
import { get } from 'lodash/fp';

export const Wrapper = styled.span`
  color: ${({ positive, theme }) => get([positive ? 'positive' : 'negative'], theme)};
`;
