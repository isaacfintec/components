import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import HistoryCard from './HistoryCard';
import ConfigForm from './ConfigForm';
import Assignee from '../Assignee';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  config: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));
const LeftPanel = (props) => {
  const classes = useStyles();
  const { ticket, groups } = props;
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12}>
        <Assignee ticket={ticket} />
      </Grid>
      <Grid container item xs={12} spacing={2} className={classes.config}>
        <Grid item xs={12}><ConfigForm ticket={ticket} groups={groups} /></Grid>
        <Grid item xs={12}><HistoryCard ticket={ticket} /></Grid>
      </Grid>
    </Grid>
  );
};

LeftPanel.propTypes = {
  ticket: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
};

export default LeftPanel;
