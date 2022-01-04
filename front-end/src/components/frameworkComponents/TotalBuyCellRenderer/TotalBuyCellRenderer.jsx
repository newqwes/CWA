import React from 'react';
import PropTypes from 'prop-types';

import { toNormalNumber } from '../../../utils/toNormalNumber';
import { Wrapper } from './styled';

class TotalBuyCellRenderer extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { value } = this.props;

    return <Wrapper>{value ? `${toNormalNumber(value)} $` : ''}</Wrapper>;
  }
}

export default TotalBuyCellRenderer;
