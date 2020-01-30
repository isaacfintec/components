/* eslint-disable import/no-named-as-default-member */
import React, { Fragment, useState, useEffect } from 'react';
import serialize from 'form-serialize';
import Table from '../../../components/Table';
import { BUTTON_CONFIRM, CURRENCY, BUTTON_CANCEL } from '../../../components/Table/TableCellTypes';
import BackButton from '../../../components/BackButton';
import ModalConfirm from '../../../components/ModalConfirm';
import CreditApi from '../../../api/credits';
import Loading from '../../../components/Loading';
import ModalUploadFiles from '../../../components/ModalUploadFiles';
import EmployeeApi from '../../../api/employees';
import SearcherEmployee from '../../../components/SearcherEmployee';

const headRows = [
  {
    id: 'rfc',
    numeric: false,
    disablePadding: true,
    label: 'RFC',
    key: 'employee.rfc',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'NOMBRE',
    key: 'employee.fullName',
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
    id: 'loanAmount',
    numeric: false,
    disablePadding: true,
    label: 'MONTO PRÈSTADO',
    key: 'amount',
    type: CURRENCY,
  },
  {
    id: 'payAmount',
    numeric: false,
    disablePadding: true,
    label: 'MONTO A PAGAR',
    key: 'amount',
    type: CURRENCY,
  },
  {
    id: 'yourLiquid',
    numeric: false,
    disablePadding: true,
    label: 'LIQUIDO NECESARIO',
    key: 'amount',
    type: CURRENCY,
  },
  {
    id: 'cancel',
    numeric: false,
    disablePadding: true,
    label: '',
    key: 'cancel',
    type: BUTTON_CANCEL,
  },
  {
    id: 'reserv',
    numeric: false,
    disablePadding: true,
    label: '',
    key: 'reserv',
    type: BUTTON_CONFIRM,
  },
];

const ReservLiquid = ({ history }) => {
  const [creditId, setCreditId] = useState('');
  const [credits, setCredits] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [isLoading, setLoad] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [openUploadFiles, setOpenUploadFiles] = useState(false);

  const name = 'claveRfc';
  const label = 'Clave / RFC';

  const handleBack = () => {
    history.push('/liquids');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchCredits = async () => {
    setLoad(true);
    const foundData = await CreditApi.pendings();
    if (foundData) {
      setCredits(foundData);
    }
    setLoad(false);
  };

  const handleContinue = async () => {
    await (
      confirm
        ? CreditApi.approve(creditId)
        : CreditApi.cancel(creditId));
    setOpen(false);
    fetchCredits();
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  const eventOption = (value, rowId) => {
    // setOpenUploadFiles(true);
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

  const mockFlow = {
    _id: '5d77f4c6c881d80fca114575',
    module: '5d77f4c6c881d80fca114571',
    action: 'holdOn',
    documents: [
      {
        _id: '5d77f4c6c881d80fca114578',
        name: 'documento A',
        description: 'chidori',
        url: 'https://amazons3.com/algo',
        delegation: '5d77f4c6c881d80fca114578',
      },
      {
        _id: '5d77f4c6c881d80fca114579',
        name: 'documento B',
        description: 'Rasengan',
        url: 'https://amazons3.com/algo',
        delegation: '5d77f4c6c881d80fca114579',
      },
    ],
  };

  const handleContinueStep = () => {
    setOpenUploadFiles(false);
  };

  const fetchEmployees = async (clave = '') => {
    setLoad(true);
    const req = {
      text: clave,
    };
    const foundData = await EmployeeApi.searchPrecredits(req);
    if (foundData) {
      setCredits(foundData);
    }
    setLoad(false);
  };

  const onClickSearch = async (formElement) => {
    const form = formElement.current;
    const { claveRfc } = serialize(form, { hash: true });
    if (claveRfc) {
      setLoad(true);
      await fetchEmployees(claveRfc.trim());
      setLoad(false);
    }
  };

  return (
    <Fragment>
      <ModalUploadFiles
        open={openUploadFiles}
        title='Faltan de subir los siguientes archivos.'
        flow={mockFlow}
        handleContinue={handleContinueStep} />
      <BackButton handleBack={handleBack}/>
      <ModalConfirm
        title={title}
        text={text}
        open={open}
        textBtnClose='Cancelar'
        handleClose={handleClose}
        textBtnContinue='Aceptar'
        handleContinue={handleContinue}
      />
      <SearcherEmployee
        name={name}
        label={label}
        onClickSearch={onClickSearch} />
      <Table
        title="Apartados"
        data={credits}
        headers={headRows}
        eventCell={eventOption} />
      { isLoading && <Loading /> }
    </Fragment>
  );
};


export default ReservLiquid;
