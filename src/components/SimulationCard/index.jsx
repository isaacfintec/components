import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import MiddleCard from './components/MiddleCard';
import HeaderCard from './components/HeaderCard';
import FooterCard from './components/FooterCard';
import useStyles from './style';


const SimulationCard = (props) => {
  const {
    amount,
    term,
    period,
    payment,
  } = props;
  const classes = useStyles();
  const paymentTerms = { label: 'Plazo', value: term };
  const periods = { label: 'Periodo', value: period };
  const LABEL_SIZE = 'body1';
  const LABEL_SIZE_SECONDARY = 'body2';
  return (
    <div className={classes.root}>

      <Grid container className={clsx(classes.box, classes.headerCard)} direction="column" justify="center" alignItems="center" spacing={0}>
        <HeaderCard
          classes={classes}
          labelSize={LABEL_SIZE}
          label='Monto solicitado'
          amount={amount}
          variant='h3'
        />
      </Grid>
      <Grid container className={clsx(classes.box, classes.middleCard)} direction="row" justify="space-around" alignItems="center" spacing={0}>
        <MiddleCard
          classes={classes}
          terms={paymentTerms}
          labelSize={LABEL_SIZE_SECONDARY}
          periods={periods}
        />
      </Grid>
      <Grid container className={clsx(classes.box, classes.footerCard)} direction="column" justify="center" alignItems="center" spacing={0}>
        <FooterCard
          classes={classes}
          labelSize={LABEL_SIZE}
          label={'*Pago fijo por el plazo seleccionado, incluye interés.' }
          payment={payment}
          variant='h2'
        />
      </Grid>

    </div>
  );
};

SimulationCard.propTypes = {
  amount: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  payment: PropTypes.string.isRequired,
};

export default SimulationCard;
