import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Divider, Grid, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SendIcon from '@material-ui/icons/Send';
import CommentItem from './CommentItem';
import SubjectItem from './SubjectItem';
import Editor from './Editor';

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: '90vh',
    overflow: 'scroll',
  },
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

const Comments = (props) => {
  const classes = useStyles();
  const {
    text, ticket, handleEditorChange, handleSendComment,
  } = props;
  const { comments, subject } = ticket;
  return (
    <Paper>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <SubjectItem ticket={ticket} />
          <Divider variant="fullWidth" />
          {comments.length > 0 && comments.map(comment => (
            <Fragment key={comment._id}>
              <CommentItem commentData={comment} subject={subject} />
              <Divider variant="fullWidth" />
            </Fragment>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Editor handleEditorChange={handleEditorChange} text={text} />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={event => handleSendComment(event)}
          >
          Enviar
            <SendIcon className={classes.rightIcon}>send</SendIcon>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

Comments.propTypes = {
  text: PropTypes.string.isRequired,
  ticket: PropTypes.object.isRequired,
  handleEditorChange: PropTypes.func.isRequired,
  handleSendComment: PropTypes.func.isRequired,
};

export default Comments;
