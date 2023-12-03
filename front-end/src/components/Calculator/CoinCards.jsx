import React from 'react';
import { Avatar } from 'antd';
import { map } from 'lodash/fp';
import PropTypes from 'prop-types';
import { Card, Paragraph, PriceChange } from './styled';

const { Meta } = Card;

const CoinCards = ({ coins, isSortByAmount }) =>
  map(
    ({ label, price, src, id, priceChange, amount }) => {
      const textToWallet = `${id} ${amount * price} = ${price} binance`;
      return (
        <Card key={id} amount={amount}>
          <Meta
            avatar={
              <a
                target="_blank"
                href={`https://www.coingecko.com/en/coins/${id}`}
                rel="noreferrer"
              >
                <Avatar src={src} />
              </a>
            }
            title={label}
          />
          <div>Цена: {price}$</div>
          <PriceChange priceChange={priceChange}>
            Изменение за месяц: {priceChange}%
          </PriceChange>
          <div>Купить на: {amount}$</div>
          <Paragraph
            copyable={{
              text: textToWallet,
            }}
          >
            {textToWallet}
          </Paragraph>
        </Card>
      );
    },
    coins.sort((a, b) =>
      (isSortByAmount ? b.amount - a.amount : a.priceChange - b.priceChange),
    ),
  );

CoinCards.propTypes = {
  coins: PropTypes.array,
  isSortByAmount: PropTypes.bool,
};

CoinCards.defaultProps = {
  coins: [],
  isSortByAmount: true,
};

export default CoinCards;
