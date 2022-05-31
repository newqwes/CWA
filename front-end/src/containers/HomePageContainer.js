import { connect } from 'react-redux';
import { isAuthorized } from '../selectors/authorization';
import { handleShowAuthModalAC, handleShowRegistrationModalAC } from '../actionCreators/aplication';

import HomePage from '../components/HomePage/HomePage.jsx';

const mapStateToProps = state => ({ authorized: isAuthorized(state) });

const mapDispatchToProps = {
  handleShowAuthModal: handleShowAuthModalAC,
  handleShowRegistrationModal: handleShowRegistrationModalAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
