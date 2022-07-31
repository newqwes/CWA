import { InputNumber as InputNumberAnt, Card as CardAnt, Select as SelectAnt } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div``;

export const OptionImg = styled.img`
  height: 20px;
  margin-right: 5px;
`;

export const InputNumber = styled(InputNumberAnt)`
  margin-bottom: 10px;
  padding-right: 10px;
`;

export const Card = styled(CardAnt)`
  width: 200px;
`;

export const CardWrapper = styled.div`
  margin-top: 20px;
`;

export const Select = styled(SelectAnt)`
  width: 100%;
`;
