import React, { useState, useEffect } from 'react';
import InputBase from '../InputBase';
import { formatText } from '../../helpers/utils';

const CurrencyInput = (props) => {
  const {
    active,
    errorMessage,
    editingPhase,
    label,
    onChange,
    value,
  } = props;
  const [error, setError] = useState(false);
  const [text, setText] = useState(value);

  const clearText = (event) => {
    setText('');
    onChange('', event);
  };

  const isValid = (data) => {
    /**
     * TODO: create a validation rule for currency input data
     */
  };

  useEffect(() => {
    const { formatedValue, cleanedValue } = formatText(value, text, 'currency');
    isValid(value);
    setText(formatedValue);
  }, [value]);

  const handleChange = (event) => {
    const {
      target: { value: textValue },
    } = event;
    const { formatedValue, cleanedValue } = formatText(textValue, text, 'currency');
    isValid(formatedValue);
    setText(formatedValue);
    onChange(cleanedValue, event);
  };

  return (
    <InputBase
      value={text}
      editingPhase={editingPhase}
      label={label}
      active={active}
      format='currency'
      errorMessage={errorMessage}
      onClick={clearText}
      isValid={isValid}
      error={error}
      onChange={handleChange} />
  );
};

export default CurrencyInput;
