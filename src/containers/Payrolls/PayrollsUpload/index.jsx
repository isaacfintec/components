/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/forbid-prop-types */
import React, {
  useState,
  useEffect,
} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Button, FormLabel } from '@material-ui/core';
import socketIOClient from 'socket.io-client';
import { green, red } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import ModalConfirm from '../../../components/ModalConfirm';
import Table from '../../../components/Table';

import PayrollsApi from '../../../api/payrolls';
import { baseUrlSocketPayroll } from '../../../api/config';

import './PayrollsUpload.css';
import UploadFile from '../../../components/UploadFile';
import BackButton from '../../../components/BackButton';

// const SUBIR = 'Subiendo Nómina';
const VALIDANDO = 'Validando Nómina';
const GUARDANDO = 'Guardando Nómina';
const TERMINADO = 'Proceso Finalizado Exitosamente';
const ERROR_NOMINA = 'Error al procesar Nómina';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    marginTop: 30,
    backgroundColor: green[500],
    color: '#ffffff',
    padding: 10,
  },
  buttonError: {
    marginTop: 30,
    backgroundColor: red[500],
    color: '#ffffff',
    padding: 10,
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

const headRows = [
  {
    id: 'row',
    numeric: false,
    disablePadding: true,
    label: 'NUMERO FILA',
    key: 'row',
  },
  {
    id: 'field',
    numeric: false,
    disablePadding: true,
    label: 'CAMPO',
    key: 'field',
  },
  {
    id: 'message',
    numeric: false,
    disablePadding: true,
    label: 'MENSAJE',
    key: 'message',
  },
];

const PayrollsUpload = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState(false);
  const [fileCSV, setFileCSV] = useState();
  const classes = useStyles();

  const VALIDATING = 'validating';
  const VALIDATED = 'validated';
  const SAVING = 'saving';
  const SAVED = 'saved';
  const ERROR = 'error';
  const COMPLETE = 'complete';

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonError]: error,
  });

  const handleBack = () => {
    history.push('/payrolls');
  };

  const processErrors = async (errorsServer) => {
    const errorsData = [];
    if (errorsServer) {
      errorsServer.forEach((err) => {
        const newError = {};
        newError.row = err.row;
        err.errors.forEach((e) => {
          newError.field = e.field;
          newError.message = e.message;
        });
        errorsData.push(newError);
      });
    }
    setErrors(errorsData);
  };

  const connectSocket = () => {
    const commentRoom = socketIOClient.connect(baseUrlSocketPayroll);
    commentRoom.on(VALIDATING, () => {
      setText(VALIDANDO);
      setLoading(true);
      setSuccess(false);
      setError(false);
    });
    commentRoom.on(VALIDATED, () => {
      setText(VALIDANDO);
      setLoading(true);
      setSuccess(false);
      setError(false);
    });
    commentRoom.on(SAVING, (row) => {
      setText(GUARDANDO);
      setLoading(true);
      setSuccess(false);
      setError(false);
    });
    commentRoom.on(SAVED, () => {
      setText(GUARDANDO);
      setLoading(true);
      setSuccess(false);
      setError(false);
    });
    commentRoom.on(ERROR, (err) => {
      processErrors(err);
      setText(ERROR_NOMINA);
      setLoading(false);
      setSuccess(false);
      setError(true);
      setFileCSV();
    });
    commentRoom.on(COMPLETE, () => {
      setText(TERMINADO);
      setLoading(false);
      setSuccess(true);
      setError(false);
      setFileCSV();
      setOpen(true);
    });
  };

  const handleUpload = async () => {
    if ({ fileCSV } !== undefined) {
      const formData = new FormData();
      formData.append('payroll', fileCSV);
      await PayrollsApi.store(formData);
    }
  };

  const handleChange = (e) => {
    const fileChange = e.target.files[0];
    setFileCSV(fileChange);
  };

  const handleDrop = (files) => {
    if (files.length > 0) {
      setFileCSV(files[0]);
    }
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const handleContinue = () => {
    setOpen(false);
    history.push('/payrolls');
  };

  return (
    <div className="container">
      <ModalConfirm
        open={open}
        title="Carga Completa."
        text="El archivo se ha subido correcatamente."
        textBtnContinue="Continuar"
        textBtnClose=''
        handleContinue={handleContinue}
      />
      <BackButton
        handleBack={handleBack}
        isDisabled={loading} />
      <UploadFile
        hint='Selecciona o arrastra un archivo para subir tu nómina. (CSV)'
        acceptFile='text/csv'
        isMultiple={false}
        onChange={e => handleChange(e)}
        handleDrop={e => handleDrop(e)}
      />
      <em>{fileCSV ? `${fileCSV.name} - ${fileCSV.size} bytes` : '' }</em>
      <div>
        {
          !loading && !success
            ? <div className='divStyle'><Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={!fileCSV}
            >
            Subir nómina
            </Button>
            </div>
            : ''
        }
      </div>
      <div className='divStyle'>
        <FormLabel
          className={buttonClassname} >
          {text}
          {loading && <CircularProgress className={classes.progress} />}
        </FormLabel>
      </div>
      {
        error && <div className='divStyle'>
          <Table
            title="Errores al procesar la Nómina."
            data={errors}
            headers={headRows}
          />
        </div>
      }
    </div>
  );
};

PayrollsUpload.propTypes = {
  history: PropTypes.object.isRequired,
};

export default PayrollsUpload;
