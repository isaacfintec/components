import React from 'react';
import Typography from '@material-ui/core/Typography';

const FooterCard = (props) => {
  const {
    classes,
    payment,
    labelSize,
    label,
    variant,
  } = props;

  return (
    <React.Fragment>
      <Typography variant={variant} gutterBottom>
        {payment}
      </Typography>
      <Typography variant={labelSize} className={classes.boxLabel} gutterBottom>
        {label}
      </Typography>
    </React.Fragment>
  );
};

export default FooterCard;
