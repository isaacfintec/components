import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import NumberInput from '../../NumberInput';
import {
  AMORTIZATION_TABLE,
  CHECKBOX_TABLE,
  RADIOBUTTON_TABLE,
} from '../tableTypes';

const rowInput = (values, chunk, index, handleSelect) => {
  const {
    itemChecked,
    onCheck,
    onChange,
    type,
    value,
  } = values;
  switch (type) {
  case CHECKBOX_TABLE:
    const Percentage = (
      <NumberInput
        active={true}
        label=''
        editingPhase='new'
        onChange={onChange(index)}
        value=''
      />);
    const TableCheckbox = (
      <Checkbox
        onChange={onCheck(index)}
        color="primary"
      />);
    return { ...chunk, Percentage, TableCheckbox };
  case RADIOBUTTON_TABLE:
    const RadioButton = (
      <Radio
        checked={index === itemChecked.id}
        value={value}
        onClick={handleSelect(index)}
        color="default"
        inputProps={{ 'aria-label': 'D' }}/>
    );
    return { ...chunk, RadioButton };
  case AMORTIZATION_TABLE:
    return { ...chunk };
  default:
    return false;
  }
};

const rowsFactory = (values, handleSelect) => {
  const {
    data,
  } = values;
  return data.map((chunk, index) => {
    return rowInput(values, chunk, index, handleSelect);
  });
};

const Tablebody = (props) => {
  const {
    columns,
    onSelect,
  } = props;
  const handleSelect = index => event => {
    onSelect(index, event);
  };

  const rowList = rowsFactory(props, handleSelect);

  return (
    <TableBody>
      {rowList.map((row, rowIndex) => (
        <TableRow hover tabIndex={-1} key={rowIndex}>
          {columns.map((column, columnIndex) => {
            const {
              align,
              id,
              format,
              minWidth,
              maxWidth,
            } = column;
            const value = row[id];
            return (
              <TableCell
                key={`${rowIndex}-${columnIndex}`}
                align={align}
                style={
                  { minWidth: minWidth || '100px', maxWidth: maxWidth || '150px' }
                }
              >
                <Typography variant='body1'>
                  { format ? format(value) : value}
                </Typography>
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default Tablebody;
