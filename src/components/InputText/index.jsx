import React, { useState } from 'react';
import InputBase from '../InputBase';

const InputText = (props) => {
  const {
    active,
    label,
    value,
    onChange,
    editingPhase,
    errorMessage,
  } = props;
  const [error, setError] = useState(false);
  const [text, setText] = useState(value);

  const isValid = (data) => {
    /**
     * TODO: create a validation rule for currency input data
     */
  };

  const handleClickToClear = (event) => {
    setText('');
    onChange('', event);
  };

  const handleChange = (event) => {
    const {
      target: { value: textValue },
    } = event;
    isValid(textValue);
    setText(textValue);
    onChange(textValue, event);
  };

  return (
    <InputBase
      value={text}
      editingPhase={editingPhase}
      label={label}
      active={active}
      errorMessage={errorMessage}
      isValid={isValid}
      error={error}
      onClick={handleClickToClear}
      onChange={handleChange} />
  );
};

export default InputText;
