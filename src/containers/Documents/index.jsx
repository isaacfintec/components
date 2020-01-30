/* eslint-disable import/no-named-as-default-member */
import React, {
  useState,
  useEffect,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Table from '../../components/Table';
import Loading from '../../components/Loading';

import DocumentApi from '../../api/documents';

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

const Documents = ({ history }) => {
  const classes = useStyles();

  const [employees, setEmployees] = useState([]);
  const [isLoading, setLoad] = useState(false);

  const fetchEmployees = async (clave = '') => {
    setLoad(true);
    const req = {
      text: clave,
    };
    const foundData = await DocumentApi.search(req);
    if (foundData) {
      setEmployees(foundData);
    }
    setLoad(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /**
   * go to view url
   */
  const toView = (event, id) => {
    history.push(`/documents/${id}`);
  };

  return (
    <Grid container className={classes.gridParent}>
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
  );
};

Documents.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Documents;
