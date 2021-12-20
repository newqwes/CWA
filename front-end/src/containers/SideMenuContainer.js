import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { withRouter } from 'react-router-dom';

import { MENU } from '../constants/menu';
import SideMenu from '../components/SideMenu';

const mapStateToProps = () => ({
  menuItems: MENU,
});

export default compose(withRouter, connect(mapStateToProps))(SideMenu);
