import {
  Button as ButtonAnt,
  Card as CardAnt,
  InputNumber as InputNumberAnt,
  Select as SelectAnt,
  Typography,
} from 'antd';
import styled from 'styled-components';

const { Paragraph: ParagraphAnt } = Typography;

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
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
`;

export const Card = styled(CardAnt)`
  background-color: ${({ amount }) => (amount === 0 ? '#ffadad' : 'white')};

  .ant-card-meta {
    padding-bottom: 15px;
  }

  .ant-card-body {
    padding: 15px;
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

  button {
    margin-left: 20px;
    margin-top: 5px;
  }
`;

export const PriceChange = styled.div`
  color: ${({ priceChange }) => (priceChange > 0 ? 'green' : 'red')};
`;

export const Paragraph = styled(ParagraphAnt)``;
