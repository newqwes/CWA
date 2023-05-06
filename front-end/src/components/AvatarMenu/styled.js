import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProfileTextBlock = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  align-self: center;
  color: #444a54;
`;

export const ProfileContainer = styled(Link)`
  display: flex;
  min-height: 90px;
  min-width: 270px;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  :hover {
    background-color: #F5F5F582;
  }

  .ant-avatar {
    min-width: 70px;
    min-height: 70px;
  }

  border-bottom: 1px solid #E3E3E398;
`;

export const ProfileTitle = styled.div`
  font-weight: bold;
`;

export const ProfileDescription = styled.div`
  font-size: 12px;
`;
