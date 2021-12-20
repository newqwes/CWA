import { connect } from 'react-redux';

import { MENU } from '../constants/menu';
import SideMenu from '../components/SideMenu';

const mapStateToProps = () => ({
  menuItems: MENU,
});

export default connect(mapStateToProps)(SideMenu);
