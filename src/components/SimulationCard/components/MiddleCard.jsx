import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';

const Body = (props) => {
  const {
    classes,
    terms,
    labelSize,
    periods,
  } = props;

  return (
    <React.Fragment>
      <div className={classes.content}>
        <Typography variant="h4" component="h2" gutterBottom>
          {terms.value}
        </Typography>
        <Typography variant={labelSize} className={classes.boxLabel} component="h2" gutterBottom>
          {terms.label}
        </Typography>
      </div>
      <div className={clsx(classes.content, classes.middleContent)}>
        <span></span>
      </div>
      <div className={classes.content}>
        <Typography variant="h4" component="h2" gutterBottom>
          {periods.value}
        </Typography>
        <Typography variant={labelSize} className={classes.boxLabel} component="h2" gutterBottom>
          {periods.label}
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default Body;
