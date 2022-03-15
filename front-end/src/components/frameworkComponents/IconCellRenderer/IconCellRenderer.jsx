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
    const coinId = get(['node', 'aggData', 'coinId'], this.props);

    return (
      <Wrapper>
        {iconSrc ? (
          <a
            target='_blank'
            href={`https://coinmarketcap.com/ru/currencies/${coinId}`}
            rel='noreferrer'>
            <img src={iconSrc} alt={value} />
          </a>
        ) : (
          ''
        )}{' '}
        {value}
      </Wrapper>
    );
  }
}

export default IconCellRenderer;
