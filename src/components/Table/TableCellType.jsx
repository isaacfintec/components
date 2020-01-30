import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CurrencyFormat from 'react-currency-format';

import { formatDate, getFirstLetter } from '../../helpers';
import {
  TICKET_LETTER,
  DATE, STATUS,
  BUTTON, BUTTON_DOWNLOAD,
  CURRENCY, BUTTON_ACEPTAR,
  BUTTON_CANCEL,
  BUTTON_CONFIRM,
}
  from './TableCellTypes';

function getClassTicketLetter(priority) {
  const sameProps = {
    width: 25,
    height: 25,
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  };
  switch (getFirstLetter(priority)) {
  case 'U':
    return {
      ...sameProps,
      backgroundColor: '#8e24aa',
    };
  case 'C':
    return {
      ...sameProps,
      backgroundColor: '#e65100',
    };
  default:
    return {
      ...sameProps,
      backgroundColor: '#29b955',
    };
  }
}

const cellValueFactory = (type, value, eventCell) => {
  switch (type) {
  case TICKET_LETTER:
    return (
      <Avatar
        style={getClassTicketLetter(getFirstLetter(value))}
      >
        { getFirstLetter(value) }
      </Avatar>
    );
  case STATUS:
    return (
      <Avatar
        style={{
          width: 25,
          height: 25,
          backgroundColor: value ? '#29b955' : '#e60000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      />
    );
  case DATE:
    return formatDate(value);
  case BUTTON:
    return (
      <Fragment>
        <Button
          variant="contained"
          color="primary"
          onClick={() => eventCell(value)}>
          { value }
        </Button>
      </Fragment>
    );
  case BUTTON_DOWNLOAD:
    return (
      <Fragment>
        <Button color="primary" onClick={() => eventCell(value)}>
          { value ? 'Descargar' : '-' }
        </Button>
      </Fragment>
    );
  case CURRENCY:
    return (
      <Fragment>
        <CurrencyFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
      </Fragment>
    );
  case BUTTON_CANCEL:
    return (
      <Fragment>
        <Button
          color="primary"
          variant="contained"
          onClick={(event, id) => eventCell('Cancelar', event, id)}>
          Cancelar
        </Button>
      </Fragment>
    );
  case BUTTON_ACEPTAR:
    return (
      <Fragment>
        <Button
          color="primary"
          variant="contained"
          onClick={() => eventCell('Aceptar')}>
          Aceptar
        </Button>
      </Fragment>
    );
  case BUTTON_CONFIRM:
    return (
      <Fragment>
        <Button
          color="primary"
          variant="contained"
          onClick={() => eventCell('Confirmar')}>
          Confirmar
        </Button>
      </Fragment>
    );
  default:
    return value || '-';
  }
};

const TableCellType = ({
  type,
  value,
  className,
  eventCell,
}) => (
  <TableCell
    className={className}
    align={
      type === DATE
        ? 'center'
        : 'left'
    }
  >
    { cellValueFactory(type, value, eventCell) }
  </TableCell>
);

TableCellType.propTypes = {
  type: PropTypes.number,
  value: PropTypes.string,
};

TableCellType.defaultProps = {
  type: -1,
  value: '',
};

export default TableCellType;
