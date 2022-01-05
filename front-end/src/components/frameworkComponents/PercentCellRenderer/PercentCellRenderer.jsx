import React from 'react';
import PropTypes from 'prop-types';

import { toNormalNumber } from '../../../utils/toNormalNumber';
import { Wrapper } from './styled';

class PercentCellRenderer extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { value } = this.props;

    const actualPrice = toNormalNumber(value);

    const positive = value >= 0;

    return <Wrapper positive={positive}>{actualPrice} %</Wrapper>;
  }
}

export default PercentCellRenderer;
