import styled, { css, keyframes } from 'styled-components';
import { Layout } from 'antd';
import { get, isEqual } from 'lodash/fp';

const logoIcon = css`
  padding-right: 10px;
  margin-left: 10px;
`;

const logoParagraph = css`
  display: none;
`;

export const Logo = styled.div`
  font-family: 'Inter';
  height: 28px;
  margin: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${get(['theme', 'logo', 'color', 'default'])};
  font-size: 1.1rem;

  p {
    font-weight: 500;
    letter-spacing: 0.2px;
    margin: 0;
    ${({ collapsed }) => collapsed && logoParagraph}
  }

  span {
    transition: 0.3s;
    padding-right: 10px;
    margin-left: 50px;
    ${({ collapsed }) => collapsed && logoIcon}
  }

  &:hover {
    cursor: pointer;

    span {
      color: ${get(['theme', 'accent'])};
    }
  }
`;

export const Owerlay = styled.div`
  display: none;
`;

const animationOpacity = keyframes`
  50% { opacity: 0.85; }
`;

const appLoading = css`
  opacity: 0.98;
  animation: ${animationOpacity} 2s infinite;

  ${Owerlay} {
    display: block;
    position: absolute;
    z-index: 100000;
    height: 100vh;
    width: 100vw;
    cursor: wait;
  }
`;

export const AppWrapper = styled(Layout)`
  min-height: 100vh;
  transition: 0.5s;
  ${({ loading }) => isEqual(loading, 'true') && appLoading};
`;

export const ContentWrapper = styled(Layout.Content)`
  padding: 15px;
`;
