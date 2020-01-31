import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from './Components/TableHead';
import TableBody from './Components/TableBody';
import ButtonIcon from './Components/ButtonIcon';
import columnsType from './columns';
import { AMORTIZATION_TABLE } from './tableTypes';
import { objToArray, formatText } from '../../helpers/utils';
import useStyles from './style';

const CustomTable = (props) => {
  const {
    data,
    maxWidth,
    maxHeight,
    onSelect,
    onChange,
    onCheck,
    type,
  } = props;
  const classes = useStyles();
  let listOfColums = columnsType(type);
  const componentRef = useRef();
  const addButton = {
    id: 'balance',
    minWidth: 100,
    align: 'left',
    format: (value) => formatText(value, value, 'currency').formatedValue,
    label: (
      <ButtonIcon
        data={data}
        classes={classes}
        label='Saldo'
        id={'button1'}
        componentRef={componentRef}
      />),
  };
  if (type === AMORTIZATION_TABLE) listOfColums.push(addButton);
  const INITIAL_ID_SELECTED = '-1';
  const [itemSelected, setItemSelected] = useState({ id: INITIAL_ID_SELECTED, data: '' });
  const [listChecked, setChecked] = useState([]);

  const handleSelectEvent = (index, event) => {
    const target = { id: index, data: data[index] };
    setItemSelected(target);
    onSelect(target);
  };

  const handleOnCheckEvent = id => (event) => {
    const {
      target: {
        checked,
      },
    } = event;
    const checkedStatus = checked ? data[id] : false;
    const listChekedObj = { ...listChecked, [id]: checkedStatus };
    setChecked(listChekedObj);
    onCheck(objToArray(listChekedObj));
  };

  const handleOnChangeEvent = (index) => (value, event) => {
    const currentPercentage = value;
    data[index].percentage = currentPercentage;
    onChange(data[index]);
  };

  return (
    <Paper
      className={classes.tableRoot}
      style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    >
      <TableContainer
        className={classes.containerTable}
        style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          id='amortization-table-100'
          ref={componentRef}>
          <TableHead
            columns={listOfColums}
            classes={classes}
            componentRef={componentRef}
          />
          <TableBody
            data={data}
            type={type}
            value=''
            classes={classes}
            itemChecked={itemSelected}
            columns={listOfColums}
            onSelect={handleSelectEvent}
            onCheck={handleOnCheckEvent}
            onChange={handleOnChangeEvent}
          />
        </Table>
      </TableContainer>
    </Paper>
  );
};

CustomTable.protoTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  maxWidth: PropTypes.string,
  maxHeight: PropTypes.string,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  onCheck: PropTypes.func,
};

CustomTable.defaultProps = {
  maxHeight: '500px',
  maxWidth: '100%',
  onSelect: () => {},
  onChange: () => {},
  onCheck: () => {},
};

export default CustomTable;
