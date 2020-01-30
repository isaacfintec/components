/* eslint-disable array-callback-return */
/* eslint-disable import/no-named-as-default-member */
import React, {
  useState, Fragment,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import serialize from 'form-serialize';
import PropTypes from 'prop-types';
import Table from '../../components/Table';
import Loading from '../../components/Loading';

import EmployeeApi from '../../api/employees';
import SearcherEmployee from '../../components/SearcherEmployee';

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

const Credits = ({ history }) => {
  const classes = useStyles();

  const [employees, setEmployees] = useState([]);
  const [isLoading, setLoad] = useState(false);

  const name = 'claveRfc';
  const label = 'Clave / RFC';

  const fetchEmployees = async (clave = '') => {
    setLoad(true);
    const req = {
      text: clave,
    };
    const foundData = await EmployeeApi.searchById(req);
    if (foundData) {
      const resEmployees = [];
      foundData.map((credit) => {
        resEmployees.push(credit.employee);
      });
      setEmployees(resEmployees);
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
  const toView = (event, employeeId) => {
    history.push(`/credits/${employeeId}`);
  };

  return (
    <Fragment>
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

Credits.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Credits;
