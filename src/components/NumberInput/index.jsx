import React, { useState, useEffect } from 'react';
import InputBase from '../InputBase';
import { formatText } from '../../helpers/utils';

const NumberInput = (props) => {
  const {
    active,
    errorMessage,
    editingPhase,
    onChange,
    label,
    value,
  } = props;
  const [error, setError] = useState(false);
  const [text, setText] = useState(value);

  const clearText = (event) => {
    setText('');
    onChange('', event);
  };

  const isValid = data => {
    /**
     * TODO: create a validation rule for number input data
     */
  };

  useEffect(() => {
    const { cleanedValue } = formatText(value, '', 'number');
    setText(cleanedValue);
  }, [value]);

  const handleChange = (event) => {
    const {
      target: { value: textValue },
    } = event;
    const { cleanedValue } = formatText(textValue, text, 'number');
    isValid(textValue);
    setText(cleanedValue);
    onChange(cleanedValue, event);
  };

  return (
    <InputBase
      value={text}
      editingPhase={editingPhase}
      label={label}
      active={active}
      format='number'
      errorMessage={errorMessage}
      onClick={clearText}
      isValid={isValid}
      error={error}
      onChange={handleChange} />
  );
};

export default NumberInput;
