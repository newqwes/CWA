import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styled';
import { toNormalNumber } from '../../../utils/toNormalNumber';

class PriceCellRenderer extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { value } = this.props;

    if (typeof value === 'object') {
      const valueWithoutExponential = value.toNumber();

      const positive = valueWithoutExponential >= 0;

      return <Wrapper positive={positive}>{toNormalNumber(valueWithoutExponential)} $</Wrapper>;
    }

    const positive = value > 0;

    return <Wrapper positive={positive}>{value ? `${toNormalNumber(value)} $` : ''}</Wrapper>;
  }
}

export default PriceCellRenderer;
