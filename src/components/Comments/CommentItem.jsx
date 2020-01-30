import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, makeStyles, Typography,
} from '@material-ui/core';
// import { Edit, Delete } from '@material-ui/icons';
import ReactHtmlParser from 'react-html-parser';
import AvatarComponent from '../Assignee/Avatar';
import { formatDate } from '../../helpers';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: '70vh',
  },
  image: {
    margin: 8,
  },
  info: {
    padding: 10,
    justifyContent: 'space-between',
  },
  comment: {
    paddingLeft: 25,
  },
  subject: {
    padding: 25,
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
    },
  },
  email: {
    padding: 25,
    fontSize: 16,
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
    color: '#5d8cc5',
  },
  date: {
    padding: 25,
    fontSize: 12,
  },
  avatar: {
    margin: 20,
    width: 55,
    height: 55,
    [theme.breakpoints.down('sm')]: {
      width: 40,
      height: 40,
    },
  },
}));
const CommentItem = (props) => {
  const classes = useStyles();
  const { commentData, subject } = props;
  const { owner = {}, date, comment } = commentData;
  const { profilePicture, fullName, email } = owner;
  return (
    <Grid container className={classes.container}>
      <Grid item xs={1}>
        <AvatarComponent src={profilePicture} className={classes.avatar} />
      </Grid>
      <Grid item xs={11} className={classes.info}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              component="span"
              variant="body1"
              color="textPrimary"
              className={classes.subject}
            >
              {`Re: ${subject}`}
            </Typography>
            <br />
            <Typography
              component="span"
              variant="body1"
              className={classes.email}
            >
              {`${fullName} <${email}>`}
            </Typography>
            <br />
            <Typography
              component="span"
              variant="body1"
              color="textSecondary"
              className={classes.date}
            >
              {formatDate(date, 'MM/DD/YYYY')}
            </Typography>
          </Grid>
          {/* <Grid item>
            <IconButton><Edit /></IconButton>
            <IconButton><Delete /></IconButton>
          </Grid> */}
        </Grid>
        <Grid item xs={12} className={classes.comment}>
          {ReactHtmlParser(comment)}
        </Grid>
      </Grid>
    </Grid>
  );
};

CommentItem.propTypes = {
  commentData: PropTypes.object.isRequired,
  subject: PropTypes.string.isRequired,
};

export default CommentItem;
