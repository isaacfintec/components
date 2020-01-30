import React from 'react';
import ReactQuill from 'react-quill';
import { makeStyles } from '@material-ui/core';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  editor: {
    maxWidth: 900,
  },
}));

const Editor = ({ handleEditorChange, text }) => {
  const classes = useStyles();
  return (
    <div className={classes.editor}>
      <ReactQuill value={text} onChange={event => handleEditorChange(event)} />
    </div>
  );
};

Editor.propTypes = {
  handleEditorChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Editor;
