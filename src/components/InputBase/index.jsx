import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import useStyles from './style';

const InputBase = (props) => {
  const {
    name,
    active,
    error,
    errorMessage,
    isValid,
    label,
    editingPhase,
    onChange,
    required,
    onClick,
    type,
    value,
  } = props;
  const classes = useStyles();
  const [text, setText] = useState(value);
  const [buttonClass, setButtonClass] = useState(classes.buttonDisabled);
  const isInputClear = (data) => Boolean(data);

  const handleChange = (e) => {
    const {
      target: { value: textValue },
    } = e;
    (isInputClear(textValue)
      ? setButtonClass(clsx(classes.buttonActive))
      : setButtonClass(clsx(classes.buttonDisabled)));
    onChange(e);
  };

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleClickToClearText = () => {
    onClick();
    setButtonClass(clsx(classes.buttonDisabled));
  };

  const onMouseDown = (event) => event.preventDefault();
  const onInputFocus = () => text && setButtonClass(clsx(classes.buttonActive));
  const onInputBlur = () => text && setButtonClass(clsx(classes.buttonDisabled));

  return (
    <div className={classes.inputContainer}>
      <TextField
        error={error}
        helperText={error ? errorMessage : ''}
        className={clsx(
          classes.inputBase,
          { [classes.inputBaseError]: error || !isValid(text) },
        )}
        label={label}
        name={name}
        value={value}
        disabled={!active}
        type={type}
        required={required}
        onChange={handleChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        variant={editingPhase === 'new' ? 'outlined' : 'standard'}
        InputProps={{
          endAdornment:
            <InputAdornment
              position="end">
              { active && <IconButton
                onClick={ handleClickToClearText }
                tabIndex="-1"
                className={clsx(
                  buttonClass,
                  {
                    [classes.buttonHover]:
                      isInputClear(text) && buttonClass !== classes.buttonActive,
                  },
                )}
                onMouseDown={onMouseDown}>
                <CloseOutlinedIcon style={{ border: '1px solid red' } }/>
              </IconButton> }
            </InputAdornment>,
          className: clsx(
            { [classes.inputDisabled]: !active },
            { [classes.inputOnError]: error },
            classes.notchedOutline,
          ),
        }}
      />
    </div>
  );
};

InputBase.propTypes = {
  active: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  editingPhase: PropTypes.string,
  type: PropTypes.string,
  isValid: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputBase.defaultProps = {
  active: true,
  error: false,
  errorMessage: 'Error',
  editingPhase: 'new',
  type: 'text',
  name: 'default',
  value: '',
};

export default InputBase;
