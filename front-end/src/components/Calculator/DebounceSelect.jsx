import React from 'react';
import { Spin } from 'antd';
import debounce from 'lodash/debounce';
import { map } from 'lodash/fp';
import PropTypes from 'prop-types';

import { OptionImg, Select } from './styled';

const { Option } = Select;

const DebounceSelect = ({ getCoinList, debounceTimeout, options, loading, ...props }) => {
  const debounceFetcher = debounce(getCoinList, debounceTimeout);

  const optoinsComponents = map(
    ({ label, value, smallImg, largeImg }) => (
      <Option value={value} label={label} key={value} largeImg={largeImg}>
        <OptionImg src={smallImg} alt={label} />
        <span>{label}</span>
      </Option>
    ),
    options,
  );

  return (
    <Select
      onSearch={debounceFetcher}
      notFoundContent={loading ? <Spin size='small' /> : null}
      {...props}>
      {optoinsComponents}
    </Select>
  );
};

DebounceSelect.propTypes = {
  getCoinList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  debounceTimeout: PropTypes.number,
  options: PropTypes.array,
};

DebounceSelect.defaultProps = {
  debounceTimeout: 800,
  options: [],
};

export default DebounceSelect;
