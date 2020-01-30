/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-named-as-default-member */
import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import UploadFile from '../../../components/UploadFile';
import Loading from '../../../components/Loading';

const useStyles = makeStyles(() => ({
  gridButton: {
    placeContent: 'flex-end',
  },
}));

const Upload = () => {
  const classes = useStyles();
  const [files, setFiles] = useState({});
  const [flow, setFlow] = useState({ documents: [] });
  const [isLoading, setLoad] = useState(false);

  const mockFlow = {
    _id: '5d77f4c6c881d80fca114575',
    module: '5d77f4c6c881d80fca114571',
    action: 'holdOn',
    documents: [
      {
        _id: '5d77f4c6c881d80fca114578',
        name: 'documento A',
        description: 'chidori',
        url: 'https://amazons3.com/algo',
        delegation: '5d77f4c6c881d80fca114578',
      },
      {
        _id: '5d77f4c6c881d80fca114579',
        name: 'documento B',
        description: 'Rasengan',
        url: 'https://amazons3.com/algo',
        delegation: '5d77f4c6c881d80fca114579',
      },
    ],
  };

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

    setFiles(newFile);
  };

  const handleDrop = documentId => (f) => {
    const data = {
      [`${documentId.toString()}`]: f[0],
    };
    const newFile = { ...files, ...data };

    setFiles(newFile);
  };

  const fetchFlows = async () => {
    // peticion
    setFlow(mockFlow);
  };

  const fetchData = async () => {
    setLoad(true);
    await fetchFlows();
    setLoad(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uploadFiles = () => {
    const reqDocuments = [];
    Object.keys(files).forEach((key) => {
      reqDocuments.push({
        id: key,
        data: files[key],
      });
    });
    const request = {
      flow: flow._id,
      documents: reqDocuments,
    };
    console.log(request);
  };

  const UpLoadFile = ({ document }) => {
    const { _id, name, description } = document;
    return (
      <Fragment>
        <Grid item xs={12}>
          <UploadFile
            hint={`Subir: ${name}`}
            acceptFile='image/jpeg, image/png'
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

  return (
    <Fragment>
      <Grid container direction="row" alignItems="center">
        {
          flow.documents.map((doc, key) => (
            <Fragment key={key}>
              <UpLoadFile document={doc}/>
            </Fragment>
          ))
        }
      </Grid>

      <Grid container className={classes.gridButton} >
        <Button
          variant="contained"
          color="primary"
          onClick={uploadFiles} >
          Subir archivos
        </Button>
      </Grid>
      { isLoading && <Loading /> }
    </Fragment>
  );
};


export default Upload;
