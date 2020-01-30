/* eslint-disable import/no-named-as-default-member */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../../../components/Table';
import { BUTTON_DOWNLOAD } from '../../../../../../components/Table/TableCellTypes';

const headRows = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'NOMBRE DEL DOCUMENTO',
    key: 'name',
  },
  {
    id: 'url',
    numeric: false,
    disablePadding: true,
    label: '',
    key: 'url',
    type: BUTTON_DOWNLOAD,
  },
];

const TableDocuments = ({ documents }) => {
  return (
    <Fragment>
      <Table
        data={documents}
        headers={headRows} >
      </Table>
    </Fragment>
  );
};

TableDocuments.propTypes = {
  documents: PropTypes.array.isRequired,
};

export default TableDocuments;
