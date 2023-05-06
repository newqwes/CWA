import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, Col, Row } from 'antd';
import {
  DashboardOutlined,
  MessageOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Meta } = Card;
const Users = ({ getUserList, userList }) => {
  useEffect(() => {
    getUserList();
  }, []);

  const cardUsers = userList.map((user) => (
    <Col key={user?.id} span={4}>
      <Card
        style={{
          width: 250,
        }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <PlusOutlined key="add"/>,
          <MessageOutlined key="message"/>,
          <DashboardOutlined key="dashboard"/>,
        ]}
      >
        <Meta
          avatar={
            user?.avatarURL
              ? <Avatar src={user?.avatarURL} />
              : <Avatar icon={<UserOutlined />} />
          }
          title={user?.login}
          description="This is the description"
        />
      </Card>
    </Col>
  ));

  return <Row gutter={[16, 32]}>{cardUsers}</Row>;
};

Users.propTypes = {
  getUserList: PropTypes.func.isRequired,
  userList: PropTypes.array,
};

export default Users;
