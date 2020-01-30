/* eslint-disable import/no-named-as-default-member */
import React, {
  useState, Fragment,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import serialize from 'form-serialize';
import PropTypes from 'prop-types';
import Table from '../../components/Table';
import './Liquid.css';
import Loading from '../../components/Loading';

import EmployeeApi from '../../api/employees';
import SearcherEmployee from '../../components/SearcherEmployee';
import ModalUploadFiles from '../../components/ModalUploadFiles';

const useStyles = makeStyles({
  gridChild: {
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'center',
  },
});

const headRows = [
  {
    id: 'key',
    numeric: false,
    disablePadding: true,
    label: 'CLAVE',
    key: 'key',
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: true,
    label: 'NOMBRE',
    key: 'firstName',
  },
  {
    id: 'lastName',
    numeric: false,
    disablePadding: true,
    label: 'APELLIDO PATERNO',
    key: 'lastName',
  },
  {
    id: 'rfc',
    numeric: false,
    disablePadding: true,
    label: 'RFC',
    key: 'rfc',
  },
];

const Liquids = ({ history }) => {
  const classes = useStyles();

  const [employees, setEmployees] = useState([]);
  const [isLoading, setLoad] = useState(false);
  const [open, setOpen] = useState(false);

  const name = 'claveRfc';
  const label = 'Clave / RFC';

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

  const fetchEmployees = async (clave = '') => {
    setLoad(true);
    const req = {
      text: clave,
    };
    const foundData = await EmployeeApi.search(req);
    if (foundData) {
      setEmployees(foundData);
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

  /**
   * go to view url
   */
  const toView = (event, id) => {
    history.push(`/liquids/${id}`);
  };

  const handleContinue = (setCountFilesUpload) => {
    setCountFilesUpload(0);
    setOpen(false);
  };

  return (
    <Fragment>
      <ModalUploadFiles
        open={open}
        title='Faltan de subir los siguientes archivos.'
        flow={mockFlow}
        handleContinue={handleContinue} />
      <Grid container className={classes.gridParent}>
        <SearcherEmployee
          name={name}
          label={label}
          onClickSearch={onClickSearch} />
        <Grid item xs={12} className={classes.gridChild}>
          <Table
            title="Empleados"
            data={employees}
            headers={headRows}
            onRowClick={toView}
          />
        </Grid>
        { isLoading && <Loading /> }
      </Grid>
    </Fragment>
  );
};

Liquids.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Liquids;
