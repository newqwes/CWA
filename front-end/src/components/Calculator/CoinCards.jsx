import React from 'react';
import { Avatar } from 'antd';
import { map } from 'lodash/fp';
import PropTypes from 'prop-types';

import { Select, Card } from './styled';

const { Meta } = Card;

const CoinCards = ({ fetchOptions, debounceTimeout }) =>
  map(
    ({ label, value, src }) => (
      <Card>
        <Meta
          avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
          title='Card title'
          description='This is the description'
        />
      </Card>
    ),
    options,
  );

CoinCards.propTypes = {
  fetchOptions: PropTypes.func.isRequired,
  debounceTimeout: PropTypes.number,
};

CoinCards.defaultProps = {
  debounceTimeout: 800,
};

export default CoinCards;
