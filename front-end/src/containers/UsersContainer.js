import { connect } from 'react-redux';
import Users from '../components/Users';
import { getUserList } from '../selectors/user';
import { getUserListAC } from '../actionCreators/user';

const mapStateToProps = (state) => ({
  userList: getUserList(state),
});

const mapDispatchToProps = {
    getUserList: getUserListAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
