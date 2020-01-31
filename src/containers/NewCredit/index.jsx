import React from 'react';
import clsx from 'clsx';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Breadcrumbs from '../../components/Breadcrumbs';
import Headline from '../../components/Headline';
import IDCardUpload from '../../components/IDCardUpload';
import SimulationCard from '../../components/SimulationCard';
import Tables from '../../components/Tables';
import { AMORTIZATION_TABLE, CHECKBOX_TABLE, RADIOBUTTON_TABLE } from '../../components/Tables/tableTypes';

import useStyles from './style';

const NewCredit = (props) => {
  const {
    history,
    type,
    amortization,
    payroll,
    periods,
  } = props;
  const behavior = type;
  const userName = 'Simulación de crédito: José Manuel Días Gómez';
  const rootLabels = ['Inicio', 'Líquidos', 'Cálculo y solicitud nuevo crédito'];
  const TITLE_PAYROLL = 'Nómina(s) y porcentaje para retener pago';
  const TITLE_PERIODS = 'Periodo en el que comienza el descuento';
  const actionMessages = {
    simulation: 'Cálculo de pagos para nuevo crédito',
    pulledApart: 'Apartado y solicitud de crédito',
  };
  const TITLE_AMORTIZATION = actionMessages[behavior];
  const classes = useStyles();

  const handleOnChange = () => {
    /**
     * TODO: Create code for onChange table action;
     */
  };
  const handleOnCheck = () => {
    /**
     * TODO: Create code for onCheck table action;
     */
  };
  const handleOnSelect = () => {
    /**
     * TODO: Create code for onSelect table action;
     */
  };
  const handleOnCancel = (e) => {
    /**
     * TODO: Create code for cancel action;
     */
  };
  const handleOnSave = (e) => {
    /**
     * TODO: Create code for save action;
     */
  };
  const handleOnConfirm = (e) => {
    /**
     * TODO: Create code for confirm action;
     */
  };

  return (
    <div className={classes.newCreditRoot}>
      <Container disableGutters={true} className={classes.newCreditContainer} maxWidth="md">
        <div className={classes.newCreditBreadcrumbs} >
          <Breadcrumbs labels={rootLabels} />
          <Headline label={userName} history={history}/>
        </div>
        <Grid
          container
          className={classes.newCreditSection}
          direction="column"
          justify="space-around"
          alignItems="flex-start"
        >
          <div>
            <Typography variant="body1" className={clsx(classes.tableTitle, classes.firstTitle)}>
              { TITLE_AMORTIZATION }
            </Typography>
          </div>
          <Grid
            container
            className={classes.newCreditSectionB}
            direction="row"
            justify="space-around"
            alignItems="flex-start"
          >
            <div>
              <SimulationCard
                amount='$3,000'
                term='48'
                period='Quincenal'
                payment='$98.39'/>
            </div>
            <div>
              <Tables
                type={AMORTIZATION_TABLE}
                data={amortization}
                maxWidth='579px'
                maxHeight='360px'
              />
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.newCreditSection}
          direction="column"
          justify="center"
        >
          <div>
            <Typography variant="body1" className={classes.tableTitle}>
              { TITLE_PAYROLL }
            </Typography>
          </div>
          <div>
            <Tables
              type={CHECKBOX_TABLE}
              data={payroll}
              maxWidth='100%'
              maxHeight='362px'
              onChange={handleOnChange}
              onCheck={handleOnCheck}
            />
          </div>
        </Grid>
        <Grid
          container
          className={classes.newCreditSection}
          direction="column"
          justify="center"
        >
          <div>
            <Typography variant="body1" className={classes.tableTitle} >
              { TITLE_PERIODS }
            </Typography>
          </div>
          <div>
            <Tables
              type={RADIOBUTTON_TABLE}
              data={periods}
              maxWidth='100%'
              maxHeight='362px'
              onSelect={handleOnSelect}
            />
          </div>
        </Grid>
        <Grid
          container
          className={classes.newCreditSection}
          direction="column"
          justify="center"
        >
          <div>
            <Typography variant="body1" className={classes.tableTitle} >
              Documentos
            </Typography>
          </div>
          <div>
            <IDCardUpload title='Identificación' labelPrimary='Frente' labelSecondary='Vuelta' multiple/>
            <IDCardUpload title='Nomina(s)' labelPrimary='Documento' />
          </div>
        </Grid>
        <Grid
          container
          className={classes.buttonsSection}
          direction="row"
          justify="flex-end"
          spacing={4}
        >
          <Button onClick={handleOnCancel}>
            Salir
          </Button>
          <Button
            onClick={handleOnSave}
            variant="outlined"
            type="submit"
            color="primary"
          >
            Guardar
          </Button>
          <Button
            onClick={handleOnConfirm}
            disabled={true}
            variant="outlined"
            type="submit"
            color="primary"
          >
            Confirmar
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default NewCredit;
