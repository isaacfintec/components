import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from './style';
import UploadID from './UploadID';
import PreviewID from './PreviewID';

const IDCardUpload = ({ title, onDrop, labelPrimary, labelSecondary, twins }) => {
  const classes = useStyles();
  const [primaryFile, setPrimaryFile] = useState(null);
  const [secondaryFile, setSecondaryFile] = useState(null);

  const handleDropPrimary = acceptedFiles => {
    setPrimaryFile(acceptedFiles[0]);
    onDrop(acceptedFiles);
  };

  const handleDropSecondary = acceptedFiles => {
    setSecondaryFile(acceptedFiles[0]);
    onDrop(acceptedFiles);
  };

  const handleDeletePrimary = file => {
    setPrimaryFile(false);
    // onDelete(file);
  };

  const handleDeleteSecondary = file => {
    setSecondaryFile(false);
    // onDelete(file);
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <p className={classes.title}>{title}</p>
      </div>
      <div className={classes.interactionContainer}>
        {primaryFile ? (
          <PreviewID
            file={primaryFile}
            onDelete={handleDeletePrimary}
            label={labelPrimary}
            className={classes.interaction}
          />
        ) : (
          <UploadID
            onDrop={handleDropPrimary}
            className={classes.interaction}
            label={labelPrimary}
          />
        )}
        {twins ? (secondaryFile ? (
          <PreviewID
            file={secondaryFile}
            onDelete={handleDeleteSecondary}
            label={labelSecondary}
            className={classes.interaction}
          />
        ) : (
          <UploadID
            onDrop={handleDropSecondary}
            className={classes.interaction}
            label={labelSecondary}
          />
        )) : null }
      </div>
    </div>
  );
};

IDCardUpload.defaultProps = {
  title: 'Identificación',
  labelPrimary: 'Frente',
  labelSecondary: 'Reverso',
  multiple: false,
  accept: '',
  onDrop: () => {},
  onDelete: () => {}
};

IDCardUpload.propTypes = {
  labelPrimary: PropTypes.string,
  labelSecondary: PropTypes.string,
  title: PropTypes.string,
  multiple: PropTypes.bool,
  accept: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  onDrop: PropTypes.func,
  onDelete: PropTypes.func
};

export default IDCardUpload;
