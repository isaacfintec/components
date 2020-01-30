import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { InputBase, InputAdornment } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import useStyles from './style';

const ENTER_KEY = 13;

const Search = ({
  onEnter,
  placeholder,
  value,
  onChange,
}) => {
  const classes = useStyles();
  const [currentValue, setCurrentValue] = useState('');

  const onKeyup = (event) => {
    const { keyCode } = event;
    if (keyCode === ENTER_KEY) onEnter(event);
  };

  const handleOnChange = (event) => {
    const {
      target: { value: targetValue },
    } = event;
    setCurrentValue(targetValue);
    onChange(event);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <InputBase
      onKeyUp={onKeyup}
      placeholder={placeholder}
      className={classes.inputBase}
      inputProps={{ 'aria-label': 'search' }}
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon className={classes.icon} />
        </InputAdornment>
      }
      value={currentValue}
      onChange={handleOnChange}
    />
  );
};

Search.propTypes = {
  onEnter: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

Search.defaultProps = {
  onEnter: () => {},
  placeholder: '',
  value: '',
  onChange: () => {},
};

export default Search;
