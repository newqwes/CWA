import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Tooltip } from 'antd';
import { QuestionOutlined, UserOutlined } from '@ant-design/icons';
import { round } from 'lodash';
import { formatLastDateUpdate } from '../../utils/formatLastDateUpdate';

import {
  AdminUser,
  LastUpdate,
  Level,
  Login,
  Profit,
  Score,
  UserCard,
  Wrapper,
} from './styled';

const Users = ({ getUserList, userList }) => {
  useEffect(() => {
    getUserList();
  }, []);

  return (
    <Wrapper>
      {userList.map((user) => (
        <UserCard key={user?.id} isAdmin={user?.userType === 'admin'}>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            src={user?.avatarURL && user?.avatarURL}
            icon={!user?.avatarURL && <UserOutlined />}
          />
          {user.userType === 'admin' && <AdminUser>Admin</AdminUser>}
          <Level>Уровень {user?.level}</Level>
          <Login>
            {user?.login}
            {round(user?.profit, 1) === 0 ? (
              ''
            ) : (
              <Profit positive={user?.profit >= 0}>
                ({round(user?.profit, 1)}%)
              </Profit>
            )}
          </Login>
          <LastUpdate>
            {formatLastDateUpdate(user?.lastDateUpdate, user?.gender)}
          </LastUpdate>
          <Score>{user?.score} cwa</Score>
          <Avatar.Group
            maxCount={5}
            maxStyle={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            }}
          >
            {user?.list?.map(({ image, name }) => (
              <Tooltip key={name} title={name} placement="top">
                <Avatar src={image} />
              </Tooltip>
            )) || <Avatar icon={<QuestionOutlined />} />}
          </Avatar.Group>
        </UserCard>
      ))}
    </Wrapper>
  );
};

Users.propTypes = {
  getUserList: PropTypes.func.isRequired,
  userList: PropTypes.array,
};

export default Users;
