import { connect } from 'react-redux';

import { getLogin } from '../selectors/user';
import { deleteUserAC } from '../actionCreators/user';
import Settings from '../components/Settings';

const mapStateToProps = (state) => ({ userName: getLogin(state) });

const mapDispatchToProps = {
  deleteUser: deleteUserAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
