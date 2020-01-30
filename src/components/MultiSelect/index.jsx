import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import useStyles from './style';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelect = ({
  label,
  values,
  options,
  onChange,
  disabled,
  clearable,
  variant,
  color,
}) => {
  const classes = useStyles();
  const [localValues, setLocalValues] = useState([]);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [labelWidth, setLabelWidth] = useState(0);
  const inputLabelRef = useRef(null);

  /**
   *
   * @param {Array} currentValues
   * @returns {Array}
   */
  const formatValues = currentValues => currentValues.join(', ');

  /**
   * @returns {Boolean}
   */
  const haveValues = () => localValues.length > 0;

  /**
   * @param {Any} option
   * @returns {Boolean}
   */
  const isChecked = option => localValues.indexOf(option) > -1;

  const handleChange = (event) => {
    const { value: newValues = [] } = event.target;
    setLocalValues(newValues);
    onChange(newValues, event);
  };

  const handleOnClear = (event) => {
    event.preventDefault();
    setLocalValues([]);
    onChange([], event);
  };

  /**
   * prevents losing focus
   */
  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const handleOnFocus = () => {
    setIsOnFocus(true);
  };

  const handleOnBlur = () => {
    setIsOnFocus(false);
  };

  /**
   * @returns {Component}
   */
  const renderCleaningButton = () => (
    <IconButton
      tabIndex="-1"
      className={clsx(
        classes.iconButton,
        {
          [classes.iconButtonHaveValues]: haveValues(),
          [classes.iconButtonEnable]: isOnFocus && haveValues(),
        },
      )}
      onClick={handleOnClear}
      onMouseDown={handleMouseDown}
    >
      <ClearIcon />
    </IconButton>
  );

  useEffect(() => {
    setLocalValues(values);
  }, [values]);

  useEffect(() => {
    const {
      current: { offsetWidth },
    } = inputLabelRef;
    setLabelWidth(offsetWidth);
  }, []);

  return (
    <FormControl
      variant={variant}
      color={color}
      className={clsx(
        classes.formControl,
        { [classes.selectDisabled]: disabled },
      )}
    >
      <InputLabel ref={inputLabelRef}>
        { label }
      </InputLabel>
      <Select
        multiple
        value={localValues}
        renderValue={formatValues}
        onChange={handleChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={disabled}
        MenuProps={MenuProps}
        endAdornment={clearable && !disabled && renderCleaningButton()}
        labelWidth={labelWidth}
      >
        {
          options.map(option => (
            <MenuItem key={option} value={option}>
              <Checkbox checked checked={isChecked(option)} />
              <ListItemText primary={option} />
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

MultiSelect.propTypes = {
  label: PropTypes.string,
  values: PropTypes.array,
  options: PropTypes.array,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  variant: PropTypes.oneOf(['standard', 'outlined']),
  color: PropTypes.oneOf(['primary', 'secondary']),
};

MultiSelect.defaultProps = {
  label: '',
  values: [],
  options: [],
  onChange: () => {},
  disabled: false,
  clearable: true,
  variant: 'standard',
  color: 'primary',
};

export default MultiSelect;
