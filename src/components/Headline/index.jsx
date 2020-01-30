import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import useStyles from './style';

const Headline = ({ label, history }) => {

  console.log(history);

  const classes = useStyles();
  const handleClick = (e) => {
    history.goBack();
  };

  return (
    <Typography variant="subtitle1" className={classes.headline} >
      <IconButton
        onClick={handleClick}
        disableFocusRipple={true}
        disableRipple={true}
        className={classes.returnButton}>
        <ArrowBackIosIcon />
      </IconButton>
      <span>{label}</span>
    </Typography>
  );
};

export default Headline;
