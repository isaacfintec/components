import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

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

const Info = ({ credit }) => {
  const classes = useStyles();

  const {
    product,
    term,
    amount,
    amountPayable,
    liquid,
    startDate,
  } = credit;

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h6">
                <b>Producto: </b>{product}
                <br/>
                <b>Plazo: </b>{term}
                <br/>
                <b>Monto: </b>{amount}
                <br/>
                <b>Monto a pagar: </b>{amountPayable}
                <br/>
                <b>Liquido: </b>{liquid}
                <br/>
                <b>Fecha inicio: </b>{startDate}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

Info.propTypes = {
  credit: PropTypes.object.isRequired,
};

export default Info;
