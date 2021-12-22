import { connect } from 'react-redux';

import Statistics from '../components/Statistics';
import { getOrdersAC, setOrderAC } from '../actionCreators/order';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setOrder: setOrderAC,
  getOrders: getOrdersAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
