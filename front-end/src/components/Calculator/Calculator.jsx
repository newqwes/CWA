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

const Calculator = ({
  getCoinList,
  searchInputCoins,
  selectedCoins,
  loading,
  selectCoins,
  generateCoinCards,
  showCards,
  budget,
  changeBudget,
  gap,
  changeGap,
}) => (
  <Wrapper>
    <HeaderWrapper>
      <InputNumberWrapper>
        <InputNumber addonBefore='Бюджет' prefix='$' value={budget} onChange={changeBudget} />
        <InputNumber addonBefore='Разница' prefix='$' value={gap} onChange={changeGap} />
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
      options={searchInputCoins}
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
  budget: PropTypes.number.isRequired,
  changeBudget: PropTypes.func.isRequired,
  gap: PropTypes.number.isRequired,
  changeGap: PropTypes.func.isRequired,
  selectedCoins: PropTypes.array,
  searchInputCoins: PropTypes.array,
};

export default Calculator;
