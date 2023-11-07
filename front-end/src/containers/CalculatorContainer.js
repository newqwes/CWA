import { connect } from 'react-redux';

import {
  isLoading,
  getSelectedCoins,
  getCoins,
  isShowCards,
  getBudget,
  getGap, isPercent, getListPercentOptions,
} from '../selectors/calculator';
import {
  getCoinListAC,
  selectCoinsAC,
  generateCoinCardsAC,
  changeBudgetAC,
  changeGapAC, changeIsPercentAC, handleChangeListPercentAC,
} from '../actionCreators/search';
import Calculator from '../components/Calculator';

const mapStateToProps = state => ({
  loading: isLoading(state),
  selectedCoins: getSelectedCoins(state),
  searchInputCoins: getCoins(state),
  showCards: isShowCards(state),
  isPercent: isPercent(state),
  budget: getBudget(state),
  gap: getGap(state),
  listPercentOptions: getListPercentOptions(state),
});

const mapDispatchToProps = {
  getCoinList: getCoinListAC,
  selectCoins: selectCoinsAC,
  generateCoinCards: generateCoinCardsAC,
  changeBudget: changeBudgetAC,
  changeGap: changeGapAC,
  changeIsPercent: changeIsPercentAC,
  handleChangeListPercent: handleChangeListPercentAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
