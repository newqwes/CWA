import React from 'react';
import PropTypes from 'prop-types';

import withoutExponential from '../../../utils/withoutExponential';
import { Wrapper } from './styled';

class LastChangeCellRenderer extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { value } = this.props;

    const positive = value >= 0;
    return <Wrapper positive={positive}>{withoutExponential(value)} $</Wrapper>;
  }
}

export default LastChangeCellRenderer;
