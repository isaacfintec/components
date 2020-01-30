/* eslint-disable import/no-named-as-default-member */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../components/Table';
import { CURRENCY, BUTTON_CANCEL } from '../../../../components/Table/TableCellTypes';

const headRows = [
  {
    id: 'comercialHouse',
    numeric: false,
    disablePadding: true,
    label: 'CASA COMERCIAL',
    key: 'comertialHouseProduct.comercialHouse.name',
  },
  {
    id: 'product',
    numeric: false,
    disablePadding: true,
    label: 'PRODUCTO',
    key: 'comertialHouseProduct.name',
  },
  {
    id: 'term',
    numeric: false,
    disablePadding: true,
    label: 'PLAZO',
    key: 'period',
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: true,
    label: 'MONTO',
    key: 'amount',
    type: CURRENCY,
  },
  {
    id: 'sectionDate',
    numeric: false,
    disablePadding: true,
    label: 'FECHA APARTADO',
    key: 'createdAt',
  },
  {
    id: 'lastDate',
    numeric: false,
    disablePadding: true,
    label: 'FECHA VENCIMIENTO',
    key: 'deadLine',
  },
  {
    id: 'cancel',
    numeric: false,
    disablePadding: true,
    label: '',
    key: 'cancel',
    type: BUTTON_CANCEL,
  },
];

const TableReserv = ({ amounts, employeeId, history }) => {
  const toView = (event, creditId) => {
    history.push(`/credits/${employeeId}/${creditId}`);
  };

  return (
    <Fragment>
      <Table
        data={amounts}
        headers={headRows}
        onRowClick={toView} >
      </Table>
    </Fragment>
  );
};

TableReserv.propTypes = {
  amounts: PropTypes.array.isRequired,
};

export default TableReserv;
