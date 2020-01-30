import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import CurrencyFormat from 'react-currency-format';

const useStyles = makeStyles({
  card: {
    textAlign: 'center',
  },
});

const AmountCard = ({ description, amount }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          <b><CurrencyFormat
            value={amount}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}/>
          </b>
        </Typography>
        <br/>
        <Typography>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

AmountCard.propTypes = {
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default AmountCard;
