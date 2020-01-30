import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import DropZone from '../../DropZone';
import useStyles from './style';

const UploadID = ({ multiple, accept, onDrop, className, label }) => {
  const classes = useStyles();
  return (
    <div className={classnames(classes.parent, className)}>
      <span className={classes.label}>{label}</span>
      <DropZone multiple={multiple} accept={accept} onDrop={onDrop} />
    </div>
  );
};

UploadID.defaultProps = {
  label: 'Frente',
  className: '',
  multiple: false,
  accept: '',
  onDrop: () => {}
};

UploadID.propTypes = {
  label: PropTypes.string,
  multiple: PropTypes.bool,
  accept: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  onDrop: PropTypes.func,
  className: PropTypes.string
};

export default UploadID;
