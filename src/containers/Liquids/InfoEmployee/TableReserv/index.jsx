/* eslint-disable import/no-named-as-default-member */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../components/Table';
import { CURRENCY, BUTTON_CANCEL } from '../../../../components/Table/TableCellTypes';
import ModalConfirm from '../../../../components/ModalConfirm';
import CreditApi from '../../../../api/credits';

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

const TableReserv = ({ amounts }) => {
  const [creditId, setCreditId] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinue = async () => {
    await (
      confirm
        ? CreditApi.approve(creditId)
        : CreditApi.cancel(creditId));
    setOpen(false);
    window.location.reload(false);
  };

  const eventOption = (value, rowId) => {
    setCreditId(rowId);
    switch (value) {
    case 'Cancelar':
      setTitle('Cancelar el apartado');
      setText('Esta seguro que desea cancelar el apartado.');
      setOpen(true);
      setConfirm(false);
      break;
    case 'Confirmar':
      setTitle('Confirmar el apartado');
      setText('Esta seguro que desea confirmar el apartado.');
      setOpen(true);
      setConfirm(true);
      break;
    default:
      setTitle('Error');
      setText('Hay un error en la programacion.');
      setOpen(true);
      setConfirm(false);
      break;
    }
  };

  return (
    <Fragment>
      <ModalConfirm
        title={title}
        text={text}
        open={open}
        textBtnClose='Cancelar'
        handleClose={handleClose}
        textBtnContinue='Aceptar'
        handleContinue={handleContinue}
      />
      <Table
        data={amounts}
        headers={headRows}
        eventCell={eventOption} >
      </Table>
    </Fragment>
  );
};

TableReserv.propTypes = {
  amounts: PropTypes.array.isRequired,
};

export default TableReserv;
