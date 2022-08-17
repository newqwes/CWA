import React from 'react';
import { Avatar } from 'antd';
import { map } from 'lodash/fp';
import PropTypes from 'prop-types';

import { Card } from './styled';

const { Meta } = Card;

const CoinCards = ({ coins }) =>
  map(
    ({ label, price, src, id, priceChange, ammount }) => (
      <Card key={id}>
        <Meta avatar={<Avatar src={src} />} title={label} />
        <div>Цена: {price}$</div>
        <div>Изменение: {priceChange}%</div>
        {ammount && <div>Купить на: {ammount}$</div>}
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
