import { connect } from 'react-redux';
import { Empty } from 'antd';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

const mapStateToProps = () => ({});

export default compose(connect(mapStateToProps), withAuthRedirect)(Empty);
