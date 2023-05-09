import styled, { css } from 'styled-components';
import { Tooltip as TooltipAntd } from 'antd';

export const UserCard = styled.div`
  display: grid;
  justify-content: center;
  text-align: center;

  .ant-avatar {
    margin: 0 auto;
  }
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;

  ${(props) =>
    (props.isAdmin
      ? css`
          background-color: #ffcc00;
          color: #fff;
        `
      : css`
          background-color: #f5f5f5;
          color: #000;
        `)};
`;
export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;

export const Level = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

export const Login = styled.div`
  font-size: 14px;
  color: #666;
`;

export const LastUpdate = styled.div`
  font-size: 12px;
  color: #999;
`;

export const Score = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-top: 8px;
`;

export const AdminUser = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 12px;
`;

export const Profit = styled.span`
  margin-left: 5px;
  color: ${({ positive }) => (positive ? 'green' : 'red')};
`;

export const Tooltip = styled(TooltipAntd)`
`;
