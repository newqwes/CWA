import styled from 'styled-components';
import { get } from 'lodash/fp';

// 'default', 'text', 'active'
const getColor = type => get(['theme', 'buttons', 'google', type]);

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 50%;
  height: 40px;
  background-color: ${getColor('default')};
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 0 6px ${getColor('default')};
  }
  &:active {
    background: ${getColor('active')};
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  margin-top: 1px;
  margin-left: 1px;
  width: 38px;
  height: 38px;
  border-radius: 2px;
  background-color: ${getColor('text')};

  svg {
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
    width: 16px;
    height: 16px;
  }
`;

export const Title = styled.p`
  float: right;
  margin: 9px 33px 0 0;
  color: ${getColor('text')};
  font-size: 14px;
  letter-spacing: 0.2px;
  font-weight: 600;
`;
