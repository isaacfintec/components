import React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { formatText } from '../../helpers/utils';
import { formatDate } from '../../helpers';
import {
  AMORTIZATION_TABLE,
  CHECKBOX_TABLE,
  RADIOBUTTON_TABLE,
} from './tableTypes';

const format = (value, type) => {
  if (type === 'date') return formatDate(value, 'DD/MM/YY', 'America/Mexico_City');
  if (type === 'currency') return formatText(value, value, 'currency').formatedValue;
};

const columns = (tableType) => {
  switch (tableType) {
  case CHECKBOX_TABLE:
    return [
      {
        id: 'job',
        label: 'Plaza',
        minWidth: 100,
        align: 'left',
      },
      {
        id: 'dependency',
        label: 'Dependencia',
        minWidth: 100,
        align: 'left',
      },
      {
        id: 'years',
        label: 'Antigüedad',
        minWidth: 100,
        align: 'left',
      },
      {
        id: 'capacity',
        label: 'Capacidad',
        minWidth: 80,
        align: 'left',
        format: value => format(value, 'currency'),
      },
      {
        id: 'available',
        label: 'Disponible',
        minWidth: 80,
        align: 'right',
        format: value => format(value, 'currency'),
      },
      {
        id: 'Percentage',
        label: 'Porcentaje',
        minWidth: 80,
        align: 'center',
      },
      {
        id: 'TableCheckbox',
        label: <ArrowDropDownIcon />,
        minWidth: 50,
        align: 'center',
      },
    ];
  case RADIOBUTTON_TABLE:
    return [
      {
        id: 'number',
        label: 'Número',
        minWidth: 100,
        align: 'left',
      },
      {
        id: 'period',
        label: 'Periodo',
        minWidth: 100,
        align: 'left',
      },
      {
        id: 'startdate',
        label: 'Fecha Inicio',
        minWidth: 100,
        align: 'left',
      },
      {
        id: 'RadioButton',
        label: (<ArrowDropDownIcon />),
        minWidth: 50,
        align: 'center',
      },
    ];
  case AMORTIZATION_TABLE:
    return [
      {
        id: 'numberPayment',
        label: 'Pago',
        minWidth: 60,
        maxWidth: 65,
        align: 'left',
      },
      {
        id: 'date',
        label: 'Fecha',
        minWidth: 90,
        maxWidth: 105,
        align: 'left',
        format: value => format(value, 'date'),
      },
      {
        id: 'capitalPayment',
        label: 'A Capital',
        minWidth: 90,
        maxWidth: 105,
        align: 'left',
        format: value => format(value, 'currency'),
      },
      {
        id: 'interest',
        label: 'Interes',
        minWidth: 90,
        maxWidth: 105,
        align: 'left',
        format: value => format(value, 'currency'),
      },
      {
        id: 'payment',
        label: 'Pago',
        minWidth: 90,
        maxWidth: 105,
        align: 'left',
        format: value => format(value, 'currency'),
      },
    ];
  default:
    return false;
  }
};

export default columns;
