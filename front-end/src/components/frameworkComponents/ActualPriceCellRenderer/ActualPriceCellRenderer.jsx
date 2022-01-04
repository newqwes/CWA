import React from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash/fp';

import { toNormalNumber } from '../../../utils/toNormalNumber';
import { Wrapper } from './styled';

class ActualPriceCellRenderer extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    context: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { value } = this.props;

    const amount = toNormalNumber(value);
    console.log(this.props.context);

    const allLeafChildren = get(['rowNode', 'allLeafChildren'], this.props);

    if (isEmpty(allLeafChildren)) return 0;

    return <Wrapper>{amount}</Wrapper>;
  }
}

export default ActualPriceCellRenderer;
