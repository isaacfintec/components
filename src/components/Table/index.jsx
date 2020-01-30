/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TablePagination from '@material-ui/core/TablePagination';
import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';
import TableCellType from './TableCellType';
import { dotStringSearch } from '../../helpers';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    padding: 25,
  },
  table: {
    minWidth: 750,
  },
  row: {
    cursor: 'pointer',
    fontWeight: 'normal',
  },
  rowBold: {
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const TableGenerator = (props) => {
  const {
    title,
    data: rows,
    count,
    headers,
    checkRow,
    onAdd,
    onRowClick,
    onChangePage,
    onChangeLimit,
    titleAdd,
    eventCell,
    canAdd,
  } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('updatedAt');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, name) {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
    onChangePage(newPage, rowsPerPage);
  }

  function handleChangeRowsPerPage(event) {
    const limit = +event.target.value;
    setRowsPerPage(limit);
    setPage(0);
    onChangeLimit(1, limit);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onAdd={onAdd}
          canAdd={canAdd}
          title={title}
          titleAdd={titleAdd}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              headRows={headers}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              checkRow={checkRow}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.uid);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      // eslint-disable-next-line
                      onClick={event => onRowClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      // eslint-disable-next-line
                      key={row._id}
                      selected={isItemSelected}
                    >
                      {
                        checkRow && (
                          <TableCell
                            onClick={event => handleClick(event, row.uid)}
                            padding="checkbox"
                          >
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>
                        )
                      }
                      {
                        headers.map((header, columnIndex) => {
                          const columnType = header.type;
                          const columnValue = `${dotStringSearch(row, header.key)}`;
                          const key = `TableColumn-${columnIndex}`;
                          return (
                            <TableCellType
                              className={row.viewed ? classes.row : classes.rowBold}
                              key={key}
                              type={columnType}
                              value={columnValue}
                              eventCell={event => eventCell(event, row._id)}
                            />
                          );
                        })
                      }
                    </TableRow>
                  );
                })}
              {
                emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          labelRowsPerPage="Filas Por Pagina:"
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          count={count || rows.length}
          onChangePage={handleChangePage}
        />
      </Paper>
    </div>
  );
};

TableGenerator.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  count: PropTypes.number,
  headers: PropTypes.array.isRequired,
  checkRow: PropTypes.bool,
  onAdd: PropTypes.func,
  onRowClick: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeLimit: PropTypes.func,
  eventCell: PropTypes.func,
  canAdd: PropTypes.bool,
};

TableGenerator.defaultProps = {
  title: '',
  count: 0,
  checkRow: false,
  onAdd: () => {},
  onRowClick: () => {},
  eventCell: () => {},
  onChangePage: () => {},
  onChangeLimit: () => {},
  canAdd: true,
};

export default TableGenerator;
