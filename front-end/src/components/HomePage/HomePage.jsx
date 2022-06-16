import React from 'react';
import PropTypes from 'prop-types';

import { Result } from 'antd';
import { SketchOutlined } from '@ant-design/icons';

import Title from './Title.jsx';
import SubTitle from './SubTitle.jsx';
import Extra from './Extra.jsx';

const HomePage = ({ userName }) => (
  <div>
    <Result
      icon={<SketchOutlined />}
      title={<Title userName={userName} />}
      subTitle={<SubTitle />}
      extra={<Extra />}
    />
  </div>
);

export default HomePage;

HomePage.propTypes = {
  userName: PropTypes.string,
};
