import {
  InputNumber as InputNumberAnt,
  Card as CardAnt,
  Select as SelectAnt,
  Button as ButtonAnt,
} from 'antd';
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

export const CardWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

export const Card = styled(CardAnt)`
  width: 250px;
  margin: 10px;

  .ant-card-meta {
    padding-bottom: 15px;
  }
`;

export const Select = styled(SelectAnt)`
  width: 100%;
`;

export const Button = styled(ButtonAnt)``;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InputNumberWrapper = styled.div`
  width: 60%;
`;
