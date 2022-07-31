import { connect } from 'react-redux';

import { isLoading, getSelectedCoins, getCoins, isShowCards } from '../selectors/calculator';
import {
  getCoinListAC,
  selectCoinsAC,
  generateCoinCardsAC,
  changeBudgetAC,
  changeDifferenceAC,
} from '../actionCreators/search';
import Calculator from '../components/Calculator';

const mapStateToProps = state => ({
  loading: isLoading(state),
  selectedCoins: getSelectedCoins(state),
  coins: getCoins(state),
  showCards: isShowCards(state),
  budgetValue: 200,
  differenceValue: 5,
});

const mapDispatchToProps = {
  getCoinList: getCoinListAC,
  selectCoins: selectCoinsAC,
  generateCoinCards: generateCoinCardsAC,
  changeBudget: changeBudgetAC,
  changeDifference: changeDifferenceAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
