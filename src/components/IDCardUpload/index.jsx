import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import UploadID from './UploadID';
import useStyles from './style';
import PreviewID from './PreviewID';

const IDCardUpload = ({ title, onDrop, labelPrimary, labelSecondary, multiple }) => {
  const classes = useStyles();
  const [primaryFile, setPrimaryFile] = useState(null);
  const [secondaryFile, setSecondaryFile] = useState(null);
  const [open, setOpen] = React.useState(true);

  const handleClickToOpen = () => {
    setOpen(!open);
  };

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

  const PrimaryFile = ({ file, label, onDelete, onDrop, style }) => {
    const ifFile = file ? <PreviewID
      file={file}
      onDelete={onDelete}
      label={label}
      className={style.interaction}
    /> : <UploadID
      onDrop={onDrop}
      className={style.interaction}
      label={label}
    />;
    return ifFile;
  };
  const SecondaryFile = ({ visible, file, label, onDeleteFile, onDropFile, style }) => {
    const ifFile = file ? <PreviewID
      file={file}
      onDelete={onDeleteFile}
      label={label}
      className={clsx(style.interaction)}
    /> : <UploadID
      onDrop={onDropFile}
      className={style.interaction}
      label={label}
    />;
    return visible && ifFile;
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.titleContainer}
        direction="row"
        justify="space-between"
        alignItems="start"
      >
        <Typography variant={'body2'} >
          {title}
        </Typography>
        <div>
          <IconButton
            onClick={handleClickToOpen}
            disableFocusRipple={true}
            disableRipple={true}
            className={classes.toggleButton}>
            { open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </IconButton>
        </div>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid
          container
          className={classes.mainContainer}
          direction="row"
          justify="space-around"
          alignItems="start"
        >
          <PrimaryFile
            file={primaryFile}
            label={labelPrimary}
            onDelete={handleDeletePrimary}
            onDrop={handleDropPrimary}
            style={classes} />
          <SecondaryFile
            visible={multiple}
            file={secondaryFile}
            label={labelSecondary}
            onDelete={handleDeleteSecondary}
            onDrop={handleDropSecondary}
            style={classes} />
        </Grid>
      </Collapse>
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
