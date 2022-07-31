import React from 'react';
import { Avatar } from 'antd';
import { map } from 'lodash/fp';
import PropTypes from 'prop-types';

import { Card } from './styled';

const { Meta } = Card;

const CoinCards = ({ coins }) =>
  map(
    ({ label, price, src, id, priceChange }) => (
      <Card key={id}>
        <Meta avatar={<Avatar src={src} />} title={label} />
        <div>Цена: {price}$</div>
        <div>Изменение: {priceChange}%</div>
        <div>Купить на: 12$</div>
      </Card>
    ),
    coins,
  );

CoinCards.propTypes = {
  coins: PropTypes.array,
};

CoinCards.defaultProps = {
  coins: [],
};

export default CoinCards;
