import React from 'react';
import PropTypes from 'prop-types';

import { toNormalNumber } from '../../../utils/toNormalNumber';
import { Wrapper } from './styled';

class AmountCellRenderer extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { value } = this.props;

    const amount = toNormalNumber(value);

    return <Wrapper>{amount}</Wrapper>;
  }
}

export default AmountCellRenderer;
