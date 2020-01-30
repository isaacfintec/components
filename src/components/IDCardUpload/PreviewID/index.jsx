import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import classnames from 'clsx';
import useStyles from './style';
import ImageActions from '../../ImageActions';

const PreviewID = ({ file, onDelete, label, className }) => {
  const classes = useStyles();
  const [url, setUrl] = useState('');

  const readFile = () => {
    const reader = new FileReader();
    reader.onloadend = function() {
      setUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const constructImage = () => ({
    url,
    name: label,
  });

  const handleOnDelete = () => {
    onDelete(file);
  };

  useEffect(() => {
    readFile();
  }, [file]);

  return (
    <Card className={classnames(classes.card, className)}>
      <CardHeader
        className={classes.cardHeader}
        title={label}
        action={
          <IconButton className={classes.iconButton} onClick={handleOnDelete}>
            <DeleteIcon />
          </IconButton>
        }
      />
      <ImageActions image={constructImage()} />
    </Card>
  );
};

PreviewID.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  file: PropTypes.instanceOf(File),
  onDelete: PropTypes.func
};

PreviewID.defaultProps = {
  className: '',
  label: '',
  file: new File([''], 'No Soportado', { type: '' }),
  onDelete: () => {}
};

export default PreviewID;
