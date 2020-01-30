import React from 'react';
import PropTypes from 'prop-types';

import { useDropzone } from 'react-dropzone';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import useStyles from './style';

const DropZone = ({ multiple, accept, onDrop }) => {
  const classes = useStyles();

  const { getRootProps, getInputProps } = useDropzone({ multiple, accept, onDrop })

  const rootProps = getRootProps({ className: classes.dropZone });
  const inputProps = getInputProps();

  return (
    <div className={classes.dropZoneContainer}>
      <Paper {...rootProps}>
        <input {...inputProps} />
        <div>
          <AddCircleOutlineIcon />
        </div>
        <Typography className={classes.typography}>
          Arrastra o selecciona el (los)<br/>
          documento(s) para agregar
        </Typography>
      </Paper>
    </div>
  )
};

DropZone.propTypes = {
  multiple: PropTypes.bool,
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onDrop: PropTypes.func,
};

DropZone.defaultProps = {
  multiple: false,
  accept: '',
  onDrop: () => {}
};

export default DropZone;
