import styled from 'styled-components';
import { Layout, Button as ButtonAnt, Typography } from 'antd';

const { Text: TextAnt, Paragraph: ParagraphAnt } = Typography;
const { Header } = Layout;

export const HeaderWrapper = styled(Header)`
  display: flex;
  justify-content: space-between;
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

export const AuthBlock = styled.div`
  display: flex;
`;

export const Paragraph = styled(ParagraphAnt)`
  margin-left: auto;
  color: #fff;
`;
