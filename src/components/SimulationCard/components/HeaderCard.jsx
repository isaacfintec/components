import React from 'react';
import Typography from '@material-ui/core/Typography';

const HeaderCard = (props) => {
  const {
    classes,
    amount,
    labelSize,
    label,
    variant,
  } = props;

  return (
    <React.Fragment>
      <Typography variant={variant} gutterBottom>
        {amount}
      </Typography>
      <Typography variant={labelSize} className={classes.boxLabel} gutterBottom>
        {label}
      </Typography>
    </React.Fragment>
  );
};

export default HeaderCard;
