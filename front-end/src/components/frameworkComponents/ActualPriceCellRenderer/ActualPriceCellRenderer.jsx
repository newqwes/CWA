import React from 'react';
import PropTypes from 'prop-types';

import { toNormalNumber } from '../../../utils/toNormalNumber';
import { Wrapper } from './styled';

class ActualPriceCellRenderer extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { value } = this.props;

    const actualPrice = toNormalNumber(value);

    return <Wrapper>{actualPrice} $</Wrapper>;
  }
}

export default ActualPriceCellRenderer;
