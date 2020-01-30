import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Typography, Divider,
} from '@material-ui/core';
import Avatar from './Avatar';

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  inline: {
    display: 'inline',
  },
  small: {
    display: 'inline',
    fontSize: 12,
  },
  info: {
    paddingLeft: 15,
  },
}));

const Assignee = (props) => {
  const classes = useStyles();
  const { ticket } = props;
  const { assignee = {} } = ticket;
  const { fullName, email, title } = assignee;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          color="textSecondary"
        >
          {`Ticket # ${ticket.uid}`}
        </Typography>
        <Divider variant="fullWidth" />
      </Grid>
      <Typography variant="body1" color="textPrimary">Asignado a</Typography>
      <Grid item container>
        <Grid item sm={12} md={4}>
          <Avatar className={classes.bigAvatar} src={assignee && assignee.profilePicture} />
        </Grid>
        <Grid item sm={12} md={8} className={classes.info}>
          <Typography
            component="span"
            variant="body2"
            className={classes.inline}
            color="textPrimary"
          >
            {fullName}
          </Typography>
          <br />
          <Typography
            component="span"
            variant="body2"
            className={classes.small}
            color="textSecondary"
          >
            {email}
          </Typography>
          <br />
          <Typography
            component="span"
            variant="body2"
            className={classes.small}
            color="textSecondary"
          >
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

Assignee.propTypes = {
  ticket: PropTypes.object.isRequired,
};

export default Assignee;
