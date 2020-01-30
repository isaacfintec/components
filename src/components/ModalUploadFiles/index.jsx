/* eslint-disable array-callback-return */
/* eslint-disable import/no-named-as-default-member */
import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import {
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from '@material-ui/core';
import UpLoadDocument from '../UpLoadDocument';
import Loading from '../Loading';

import S3Api from '../../api/s3';
import EmployeeApi from '../../api/employees';

const ModalUploadFiles = ({
  title, flow, open, employeeId, handleOnPostExecute,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoad] = useState(false);
  const [countFilesUpload, setCountFilesUpload] = useState(0);
  const [files, setFiles] = useState({});

  // Firmar documentos
  const signFiles = async () => {
    const request = [];
    Object.keys(files).map((key) => {
      const file = {
        documentId: key,
        fileName: files[key].name,
        fileType: files[key].type,
      };
      request.push(file);
    });
    const response = await S3Api.signFiles(request);
    return response;
  };

  // Subir documentos
  const uploadToS3Files = async (signedFiles) => {
    const documents = [];
    Object.keys(signedFiles).map((key) => {
      documents.push({
        id: signedFiles[key].documentId,
        url: signedFiles[key].url,
      });
    });

    await Promise.all(
      Object.keys(files).map(async (key) => {
        const { signedRequest } = signedFiles.find(element => element.documentId === key);
        await S3Api.uploadToS3(files[key], signedRequest);
      }),
    );

    const batchId = await EmployeeApi.uploadFiles(employeeId, flow._id, documents);
    handleOnPostExecute(batchId);
  };

  const handleUploadAllFiles = async () => {
    setLoad(true);
    const signedFiles = await signFiles();
    await uploadToS3Files(signedFiles);
    setLoad(false);
  };

  const addFiles = (file) => {
    setFiles(file);
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {
          isLoading && <Loading />
        }
        <Grid container direction="row" alignItems="center">
          {
            flow.documents.map((doc, key) => (
              <Fragment key={key}>
                <UpLoadDocument
                  document={doc}
                  countFilesUpload={countFilesUpload}
                  setCountFilesUpload={setCountFilesUpload}
                  addFiles={addFiles} />
              </Fragment>
            ))
          }
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={ () => handleUploadAllFiles() }
          disabled={isLoading || countFilesUpload < flow.documents.length}>
          Subir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalUploadFiles.propTypes = {
  title: PropTypes.string.isRequired,
  flow: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  employeeId: PropTypes.string.isRequired,
  handleOnPostExecute: PropTypes.func.isRequired,
};

export default ModalUploadFiles;
