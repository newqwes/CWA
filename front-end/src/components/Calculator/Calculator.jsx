import React from 'react';
import { map } from 'lodash/fp';
import PropTypes from 'prop-types';
import { Switch } from 'antd';

import CoinCards from './CoinCards.jsx';
import DebounceSelect from './DebounceSelect.jsx';
import {
  Wrapper,
  InputNumber,
  CardWrapper,
  HeaderWrapper,
  Select,
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
  isPercent,
  changeIsPercent,
  budget,
  changeBudget,
  handleChangeListPercent,
  listPercentOptions,
  gap,
  changeGap,
}) => (
  <Wrapper>
    <HeaderWrapper>
      <InputNumberWrapper>
        <InputNumber addonBefore='Бюджет' prefix='$' value={budget} onChange={changeBudget} />
        {isPercent || (
          <InputNumber addonBefore='Разница' prefix='$' value={gap} onChange={changeGap} />
        )}
        <Switch checked={isPercent} onChange={changeIsPercent} checkedChildren="%" unCheckedChildren="$" />
      </InputNumberWrapper>
      <Button type='primary' onClick={generateCoinCards} disabled={isPercent && listPercentOptions.length !== selectedCoins.length}>
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
    {isPercent && (
      <Select
        mode="tags"
        onChange={handleChangeListPercent}
        tokenSeparators={[' ']}
        options={listPercentOptions}
      />
    )}
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
  isPercent: PropTypes.bool.isRequired,
  budget: PropTypes.number.isRequired,
  changeBudget: PropTypes.func.isRequired,
  gap: PropTypes.number.isRequired,
  changeGap: PropTypes.func.isRequired,
  changeIsPercent: PropTypes.func.isRequired,
  handleChangeListPercent: PropTypes.func.isRequired,
  selectedCoins: PropTypes.array,
  listPercentOptions: PropTypes.array,
  searchInputCoins: PropTypes.array,
};

export default Calculator;
