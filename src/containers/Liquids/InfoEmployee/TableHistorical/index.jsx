import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../components/Table';
import { CURRENCY } from '../../../../components/Table/TableCellTypes';
import ModalConfirm from '../../../../components/ModalConfirm';

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
    id: 'period',
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
];

const TableReserv = ({ historical }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinue = () => {
    setOpen(false);
  };

  const eventOption = (value) => {
    switch (value) {
    case 'Cancelar':
      setTitle('Cancelar el apartado');
      setText('Esta seguro que desea cancelar el apartado.');
      setOpen(true);
      break;
    case 'Confirmar':
      setTitle('Confirmar el apartado');
      setText('Esta seguro que desea confirmar el apartado.');
      setOpen(true);
      break;
    default:
      setTitle('Error');
      setText('Hay un error en la programacion.');
      setOpen(true);
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
        data={historical}
        headers={headRows}
        eventCell={eventOption} >
      </Table>
    </Fragment>
  );
};

TableReserv.propTypes = {
  historical: PropTypes.array.isRequired,
};

export default TableReserv;
