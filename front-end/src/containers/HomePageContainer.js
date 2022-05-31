import { connect } from 'react-redux';
import { isAuthorized } from '../selectors/authorization';
import { handleShowAuthModalAC } from '../actionCreators/aplication';

import HomePage from '../components/HomePage/HomePage.jsx';

const mapStateToProps = state => ({ authorized: isAuthorized(state) });

const mapDispatchToProps = { handleShowAuthModal: handleShowAuthModalAC };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
