import styled from 'styled-components';
import { Layout, Button as ButtonAnt, Typography } from 'antd';

const { Text: TextAnt } = Typography;
const { Header } = Layout;

export const HeaderWrapper = styled(Header)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 45px;
`;

export const Button = styled(ButtonAnt)`
  margin-right: 20px;
`;

export const Text = styled(TextAnt)`
  color: #fff;
  padding: 0 15px;
`;

export const Title = styled.h3`
  color: #fff;
  padding: 0 25px;
`;
