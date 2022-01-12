import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash/fp';
import icon from 'base64-cryptocurrency-icons';

import { Wrapper } from './styled';

class SymbolCellRenderer extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { value } = this.props;

    console.log(this.props);

    const iconSymbol = get(['node', 'aggData', 'symbol'], this.props);
    const iconSrc = get([iconSymbol, 'icon'], icon);

    return (
      <Wrapper>
        {iconSrc ? <img src={iconSrc} alt={value} /> : ''} {value}
      </Wrapper>
    );
  }
}

export default SymbolCellRenderer;
