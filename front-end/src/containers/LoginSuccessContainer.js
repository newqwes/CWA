import { connect } from 'react-redux';

import LoginSuccess from '../components/AuthComponent/LoginSuccess';

const mapStateToProps = () => ({
  userName: 'userName',
});

export default connect(mapStateToProps)(LoginSuccess);
