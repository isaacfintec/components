import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useStyles from './style';

const BreadCrumbs = (props) => {
  const {
    labels,
  } = props;
  const classes = useStyles();
  return (
    <Breadcrumbs separator={ <ArrowForwardIosIcon fontSize="small" color="disabled" className={classes.separatorA}/> } aria-label="breadcrumb" className={classes.breadcrumbs}>
      {
        labels.map((label, index) => {
          return <span key={index} >{label}</span>;
        })
      }
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
