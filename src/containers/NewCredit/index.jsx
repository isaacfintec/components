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
    type,
    amortization,
    payroll,
    periods,
  } = props.data;
  const SIMULATION = 'simulation';
  const PULLED_APART = 'pulledApart';
  const TITLE_PAYROLL = 'Nómina(s) y porcentaje para retener pago';
  const TITLE_PERIODS = 'Periodo en el que comienza el descuento';
  const userName = 'Simulación de crédito: José Manuel Días Gómez';
  const actionMessages = {
    simulation: 'Cálculo de pagos para nuevo crédito',
    pulledApart: 'Apartado y solicitud de crédito',
  };
  const TITLE_AMORTIZATION = actionMessages[SIMULATION];
  const classes = useStyles();
  const handleCancel = (e) => {
    console.log(e);
  };
  return (
    <div className={classes.newCreditRoot}>
      <Container disableGutters={true} className={classes.newCreditContainer} maxWidth="md">
        <div className={classes.newCreditBreadcrumbs} >
          <Breadcrumbs labels={['Inicio', 'Líquidos', 'Cálculo y solicitud nuevo crédito']} />
          <Headline label={userName} />
        </div>
        <Grid
          container
          className={classes.newCreditSection}
          direction="column"
          justify="space-around"
          alignItems="start"
        >
          <div>
            <Typography variant="body1" className={clsx(classes.tableTitle, classes.firstTitle)}>
              { TITLE_AMORTIZATION }
            </Typography>
          </div>
          <Grid
            container
            className={classes.newCreditSectionA}
            direction="row"
            justify="space-around"
            alignItems="start"
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
                maxWidth='557px'
                maxHeight='360px'
                onChange={(e) => console.log(e)}
                onSelect={(e) => console.log(e)}
                onCheck={(e) => console.log(e)}
              />
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.newCreditSection}
          direction="column"
          justify="center"
          alignItems="start"
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
              maxHeight='360px'
              onChange={(e) => console.log(e)}
              onSelect={(e) => console.log(e)}
              onCheck={(e) => console.log(e)}
            />
          </div>
        </Grid>
        <Grid
          container
          className={classes.newCreditSection}
          direction="column"
          justify="center"
          alignItems="start"
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
              maxHeight='360px'
              onChange={(e) => console.log(e)}
              onSelect={(e) => console.log(e)}
              onCheck={(e) => console.log(e)}
            />
          </div>
        </Grid>
        <Grid
          container
          className={classes.newCreditSection}
          direction="column"
          justify="center"
          alignItems="start"
        >
          <div>
            <Typography variant="body1" className={classes.tableTitle} >
              Documentos
            </Typography>
          </div>
          <div>
            <IDCardUpload title='' labelPrimary='Frente' labelSecondary='Vuelta' twins={true}/>
            <IDCardUpload title='' labelPrimary='Frente' twins={false} />
          </div>
        </Grid>
        <Grid
          container
          className={classes.buttonsSection}
          direction="row"
          justify="flex-end"
          spacing={4}
          alignItems="start"
        >
          <Button
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            variant="outlined"
            type="submit"
            color="primary"
          >
            Guardar
          </Button>
          <Button
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
