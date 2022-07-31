import React, { useMemo, useRef, useState } from 'react';
import { Spin } from 'antd';
import debounce from 'lodash/debounce';
import { map } from 'lodash/fp';
import PropTypes from 'prop-types';

import { OptionImg, Select } from './styled';

const { Option } = Select;

const DebounceSelect = ({ fetchOptions, debounceTimeout, ...props }) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = value => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;

      setOptions([]);
      setFetching(true);

      fetchOptions(value).then(newOptions => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  const optoinsComponents = map(
    ({ label, value, src }) => (
      <Option value={value} label={label}>
        <OptionImg src={src} alt={label} />
        <span>{label}</span>
      </Option>
    ),
    options,
  );

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}>
      {optoinsComponents}
    </Select>
  );
};

DebounceSelect.propTypes = {
  fetchOptions: PropTypes.func.isRequired,
  debounceTimeout: PropTypes.number,
};

DebounceSelect.defaultProps = {
  debounceTimeout: 800,
};

export default DebounceSelect;
