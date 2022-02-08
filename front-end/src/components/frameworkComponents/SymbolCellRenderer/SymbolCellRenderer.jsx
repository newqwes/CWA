import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash/fp';

import { Wrapper } from './styled';

class IconCellRenderer extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { value } = this.props;

    const iconSrc = get(['node', 'aggData', 'icon'], this.props);

    return (
      <Wrapper>
        {iconSrc ? <img src={iconSrc} alt={value} /> : ''} {value}
      </Wrapper>
    );
  }
}

export default IconCellRenderer;
