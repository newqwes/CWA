import { connect } from 'react-redux';

import {
  isLoading,
  getSelectedCoins,
  getCoins,
  isShowCards,
  getBudget,
  getGap,
} from '../selectors/calculator';
import {
  getCoinListAC,
  selectCoinsAC,
  generateCoinCardsAC,
  changeBudgetAC,
  changeGapAC,
} from '../actionCreators/search';
import Calculator from '../components/Calculator';

const mapStateToProps = state => ({
  loading: isLoading(state),
  selectedCoins: getSelectedCoins(state),
  searchInputCoins: getCoins(state),
  showCards: isShowCards(state),
  budget: getBudget(state),
  gap: getGap(state),
});

const mapDispatchToProps = {
  getCoinList: getCoinListAC,
  selectCoins: selectCoinsAC,
  generateCoinCards: generateCoinCardsAC,
  changeBudget: changeBudgetAC,
  changeGap: changeGapAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
