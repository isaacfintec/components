/* eslint-disable no-param-reassign */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
} from '@material-ui/core';
import UploadFile from '../UploadFile';


const UpLoadDocument = ({
  document,
  countFilesUpload,
  setCountFilesUpload,
  addFiles,
}) => {
  const { _id, name, description } = document;
  const [files, setFiles] = useState({});

  const filesItems = (documentId) => {
    const file = files[documentId];

    return file !== undefined ? (
      <li key={file.name}>
        <em>{file.name} - {file.size} bytes</em>
      </li>
    ) : ('');
  };

  const handleChange = documentId => (e) => {
    const file = e.target.files[0];
    const data = {
      [`${documentId.toString()}`]: file,
    };
    const newFile = { ...files, ...data };
    setCountFilesUpload(countFilesUpload += 1);
    setFiles(newFile);
    addFiles(newFile);
  };

  const handleDrop = documentId => (f) => {
    const data = {
      [`${documentId.toString()}`]: f[0],
    };
    const newFile = { ...files, ...data };
    setCountFilesUpload(countFilesUpload += 1);

    setFiles(newFile);
    addFiles(newFile);
  };

  return (
    <Fragment>
      <Grid item xs={12}>
        <UploadFile
          hint={`Subir: ${name}`}
          acceptFile='*.*'
          onChange={handleChange(_id)}
          handleDrop={handleDrop(_id)}
          isMultiple={false}
          tooltip={description} />
        <ul>
          { filesItems(_id) }
        </ul>
      </Grid>
    </Fragment>
  );
};


UpLoadDocument.propTypes = {
  document: PropTypes.object.isRequired,
};

export default UpLoadDocument;
