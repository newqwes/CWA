import React from 'react';
import PropTypes from 'prop-types';

import withoutExponential from '../../../utils/withoutExponential';
import { Wrapper } from './styled';

class PriceCellRenderer extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { value } = this.props;

    if (typeof value === 'object') {
      const valueWithoutExponential = withoutExponential(value.toNumber());

      const positive = valueWithoutExponential >= 0;

      return <Wrapper positive={positive}>{valueWithoutExponential} $</Wrapper>;
    }

    const positive = value > 0;

    return <Wrapper positive={positive}>{value ? `${withoutExponential(value)} $` : ''}</Wrapper>;
  }
}

export default PriceCellRenderer;
