/* eslint-disable react/prop-types */
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHeader from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const TableHead = (props) => {
  const {
    headRows,
    numSelected,
    rowCount,
    onSelectAllClick,
    orderBy,
    order,
    onRequestSort,
    checkRow,
  } = props;
  const createSortHandler = property => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHeader>
      <TableRow>
        {
          checkRow && (
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'Select all desserts' }}
              />
            </TableCell>
          )
        }
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'center' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHeader>
  );
};

TableHead.propTypes = {
  headRows: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
};

export default TableHead;
