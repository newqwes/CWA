import React, { useState } from 'react';
import DebounceSelect from './DebounceSelect.jsx';

import { Wrapper, InputNumber, CardWrapper } from './styled';
import CoinCards from './CoinCards.jsx';

async function fetchCoinList(coinname) {
  return fetch(`https://api.coingecko.com/api/v3/search?query=${coinname}`)
    .then(response => response.json())
    .then(body =>
      body.coins.map(coin => ({
        label: coin.name,
        value: coin.id,
        src: coin.thumb,
      })),
    );
}

const Calculator = () => {
  const [value, setValue] = useState([]);

  console.log(value);

  return (
    <Wrapper>
      <InputNumber
        addonBefore='Бюджет'
        prefix='$'
        style={{
          width: '30%',
        }}
      />
      <InputNumber
        addonBefore='Разница'
        prefix='$'
        style={{
          width: '30%',
        }}
      />
      <DebounceSelect
        mode='multiple'
        value={value}
        placeholder='Выберите криптовалюту'
        fetchOptions={fetchCoinList}
        onChange={setValue}
      />
      <CardWrapper>
        <CoinCards />
      </CardWrapper>
    </Wrapper>
  );
};

Calculator.propTypes = {};

export default Calculator;
