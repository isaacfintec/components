import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import useStyles from './style';

const InputDropdown = (props) => {
  const {
    active,
    onSelect,
    editingPhase,
    listValues,
    label,
  } = props;
  const classes = useStyles();
  const initValue = listValues[0];
  const [actualOption, setOption] = useState(initValue.value || []);

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setOption(value);
    onSelect(e, value);
  };

  return (
    <div className={classes.inputContainer}>
      <TextField
        select
        className={clsx(
          classes.inputDropdown,
        )}
        disabled={!active}
        label={label}
        onChange={handleChange}
        value={actualOption}
        variant={editingPhase === 'new' ? 'outlined' : 'standard'}>
        {listValues.map((option, index) => (
          <MenuItem
            key={index}
            value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

InputDropdown.propTypes = {
  listValues: PropTypes.array.isRequired,
  active: PropTypes.bool,
  editingPhase: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

InputDropdown.defaultProps = {
  active: true,
  editingPhase: 'new',
};

export default InputDropdown;
