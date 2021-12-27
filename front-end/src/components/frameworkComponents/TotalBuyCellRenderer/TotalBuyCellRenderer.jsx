import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styled';

class TotalBuyCellRenderer extends React.Component {
  static propTypes = {
    value: PropTypes.number,
  };

  render() {
    const { value } = this.props;

    return <Wrapper>{value} $</Wrapper>;
  }
}

export default TotalBuyCellRenderer;
