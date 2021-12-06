import styled from 'styled-components';
import { Space as AntdSpace, Layout } from 'antd';

const { Header } = Layout;

export const Space = styled(AntdSpace)`
  margin-left: auto;
`;

export const HeaderWrapper = styled(Header)`
  display: flex;
`;
