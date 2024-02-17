import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from 'antd';
import { Wrapper } from './styled';
import { toNormalNumber } from '../../../utils/toNormalNumber';

class LastChangeCellRenderer extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { value } = this.props;

    const positive = value >= 0;
    return (
      <Tooltip title={toNormalNumber(value)}>
        <Wrapper positive={positive}>{toNormalNumber(value)} $</Wrapper>
      </Tooltip>
    );
  }
}

export default LastChangeCellRenderer;
