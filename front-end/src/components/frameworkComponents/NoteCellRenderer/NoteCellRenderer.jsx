import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from 'antd';

class NoteCellRenderer extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { value } = this.props;

    return (
      <Tooltip
        title={<pre>{value}</pre>}
        placement="leftTop"
        color="blue"
        overlayStyle={{ maxWidth: '900px' }}
      >
        {value}
      </Tooltip>
    );
  }
}

export default NoteCellRenderer;
