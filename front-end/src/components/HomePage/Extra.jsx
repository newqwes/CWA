import React from 'react';

import { Button } from './styled';

const Extra = () => (
  <div>
    <Button shape='circle' href='https://www.coingecko.com' target='_blank' type='link'>
      Gecko
    </Button>
    <Button shape='circle' href='https://coinmarketcap.com/ru/' target='_blank' type='link'>
      Marketcap
    </Button>
    <Button
      shape='circle'
      href='https://ru.tradingview.com/chart/1G7G96B4/'
      target='_blank'
      type='link'>
      TradingView
    </Button>
    <Button
      shape='circle'
      href='https://www.coinglass.com/LiquidationData'
      target='_blank'
      type='link'>
      Coinglass
    </Button>
    <Button shape='circle' href='https://t.me/count_in_wallet_bot' target='_blank' type='link'>
      Telegram Bot
    </Button>
  </div>
);

export default Extra;
