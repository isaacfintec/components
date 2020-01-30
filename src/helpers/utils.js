function cleanValue(data) {
  try {
    return data.replace(/[$]*[,]*/g, '') || '';
  } catch (err) {
    return data;
  }
}

function isNumber(data) {
  const value = cleanValue(data);
  const number = /^[0-9]+(\.\d{0,2})?$/.test(value);
  return number && value;
}

function formatToCurrencyValue(data) {
  return `$${data.replace(/\d(?=(\d{3})+(\.\d+)?$)/g, '$&,')}`;
}

// eslint-disable-next-line import/prefer-default-export
export const formatText = (_value, currentValue, format) => {
  const value = _value.toString();
  if (!value.length || value === '$') {
    return '';
  }
  if (format.match(/number|currency/g)) {
    const numberValue = isNumber(value);
    if (!numberValue) {
      return {
        formatedValue: currentValue,
        cleanedValue: cleanValue(currentValue),
      };
    }
    if (format.match(/currency/g)) {
      const addTwoDecimals = Number(numberValue).toFixed(2);
      return {
        formatedValue: formatToCurrencyValue(addTwoDecimals),
        cleanedValue: numberValue,
      };
    }
    return {
      cleanedValue: numberValue,
    };
  }
  return value;
};

export const objToArray = (obj) => {
  return Object.keys(obj)
    .map(i => obj[i])
    .filter(data => data);
};
