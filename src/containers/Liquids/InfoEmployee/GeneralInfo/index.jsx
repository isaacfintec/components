import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AmountCard from './AmountCard';
import BackButton from '../../../../components/BackButton';
import HavePermission from '../../../../components/HavePermission';
import ModalUploadFiles from '../../../../components/ModalUploadFiles';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
  },
  button: {
    margin: theme.spacing(1),
  },
  grid: {
    alignSelf: 'center',
  },
  gridButton: {
    placeContent: 'flex-end',
  },
}));

const GeneralInfo = ({ history, employee, credit }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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

  const handleNewAmount = () => {
    history.push(`/liquids/simulate/${employee._id}`);
  };

  const handleContinue = (setCountFilesUpload) => {
    setCountFilesUpload(0);
    setOpen(false);
  };

  const handleBack = () => {
    history.push('/liquids');
  };

  return (
    <Fragment>
      <ModalUploadFiles
        open={open}
        title='Faltan de subir los siguientes archivos.'
        flow={mockFlow}
        handleContinue={handleContinue} />
      <BackButton handleBack={handleBack} />
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h6">
                <b>Clave del empleado: </b>{employee.key}
                <br/>
                <b>Nombre: </b>{employee.fullName}
                <br/>
                <b>RFC: </b>{employee.rfc}
                <br/>
                <b>Entidad Gobierno: </b>{employee.delegation.name}
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.grid}>
              <AmountCard amount={credit.current ? credit.current : 0} description='Disponible'/>
            </Grid>
            <Grid item xs={3} className={classes.grid}>
              <AmountCard amount={credit.total ? credit.total : 0} description='Total'/>
            </Grid>
          </Grid>
        </CardContent>
        <HavePermission module="liquids" permission="holdOn">
          <CardActions>
            <Grid container className={classes.gridButton}>
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
                size="small"
                onClick={() => handleNewAmount()}>
                  Nuevo Apartado</Button>
            </Grid>
          </CardActions>
        </HavePermission>
      </Card>
    </Fragment>
  );
};

GeneralInfo.propTypes = {
  employee: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default GeneralInfo;
