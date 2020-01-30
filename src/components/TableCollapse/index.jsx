import React from 'react';
import PropTypes from 'prop-types';

import Thead from './components/Thead';
import Tbody from './components/Tbody';

import useStyles from './style';

const Table = ({
  headers,
  items,
  onClickRow,
  editedRow,
}) => {
  const classes = useStyles();
  return (
    <table className={classes.table}>
      <Thead headers={headers} />
      <Tbody
        headers={headers}
        items={items}
        onClickRow={onClickRow}
        editedRow={editedRow}
      />
    </table>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  items: PropTypes.array,
  onClickRow: PropTypes.func,
  editedRow: PropTypes.number,
};

Table.defaultProps = {
  headers: [],
  items: [],
  onClickRow: () => {},
  editedRow: -1,
};

export default Table;
