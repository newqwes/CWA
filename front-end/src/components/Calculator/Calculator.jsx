import React from 'react';
import { map } from 'lodash/fp';
import PropTypes from 'prop-types';

import CoinCards from './CoinCards.jsx';
import DebounceSelect from './DebounceSelect.jsx';
import {
  Wrapper,
  InputNumber,
  CardWrapper,
  HeaderWrapper,
  Button,
  InputNumberWrapper,
} from './styled';

// TODO: Implement it
const currency = ['BTC', 'ETH', 'LTC', 'BCH', 'BCH', 'BCH', 'BCH'];
const budget = 200;
const gap = 5;

const result = currency.map((item, key) => {
  let multiplier = Math.floor(currency.length / 2) - key;

  if (!(currency.length % 2) && multiplier > 0) {
    multiplier -= 1;
  }

  return {
    currency: item,
    ammount: budget / currency.length + multiplier * gap,
  };
});

console.log(result);

const Calculator = ({
  getCoinList,
  coins,
  selectedCoins,
  loading,
  selectCoins,
  generateCoinCards,
  showCards,
  budgetValue,
  changeBudget,
  differenceValue,
  changeDifference,
}) => (
  <Wrapper>
    <HeaderWrapper>
      <InputNumberWrapper>
        <InputNumber
          addonBefore='Бюджет'
          prefix='$'
          defaultValue={200}
          value={budgetValue}
          onChange={changeBudget}
        />
        <InputNumber
          addonBefore='Разница'
          prefix='$'
          defaultValue={15}
          value={differenceValue}
          onChange={changeDifference}
        />
      </InputNumberWrapper>
      <Button type='primary' onClick={generateCoinCards}>
        Посчитать
      </Button>
    </HeaderWrapper>
    <DebounceSelect
      mode='multiple'
      value={map(({ id }) => id, selectedCoins)}
      placeholder='Выберите криптовалюту'
      getCoinList={getCoinList}
      onChange={selectCoins}
      options={coins}
      loading={loading}
    />
    {showCards && (
      <CardWrapper>
        <CoinCards coins={selectedCoins} />
      </CardWrapper>
    )}
  </Wrapper>
);

Calculator.propTypes = {
  getCoinList: PropTypes.func.isRequired,
  selectCoins: PropTypes.func.isRequired,
  generateCoinCards: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  showCards: PropTypes.bool.isRequired,
  budgetValue: PropTypes.number.isRequired,
  changeBudget: PropTypes.func.isRequired,
  differenceValue: PropTypes.number.isRequired,
  changeDifference: PropTypes.func.isRequired,
  selectedCoins: PropTypes.array,
  coins: PropTypes.array,
};

export default Calculator;
