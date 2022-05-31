import { connect } from 'react-redux';

import { getLogin } from '../selectors/user';
import HomePage from '../components/HomePage/HomePage.jsx';

const mapStateToProps = state => ({ userName: getLogin(state) });

export default connect(mapStateToProps)(HomePage);
