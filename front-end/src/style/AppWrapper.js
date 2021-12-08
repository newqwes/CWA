import styled, { css } from 'styled-components';
import { Layout } from 'antd';
import { get } from 'lodash/fp';

export const AppWrapper = styled(Layout)`
  min-height: 100vh;
`;

const logoIcon = css`
  padding-right: 10px;
  margin-left: 10px;
`;

const logoParagraph = css`
  display: none;
`;

export const Logo = styled(Layout)`
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
    ${({ collapsedSideMenu }) => collapsedSideMenu && logoParagraph}
  }

  span {
    transition: 0.3s;
    padding-right: 10px;
    margin-left: 50px;
    ${({ collapsedSideMenu }) => collapsedSideMenu && logoIcon}
  }

  &:hover {
    cursor: pointer;

    span {
      color: ${get(['theme', 'accent'])};
    }
  }
`;
