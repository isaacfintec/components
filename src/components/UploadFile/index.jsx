import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Tooltip } from '@material-ui/core';

const UploadFile = ({
  hint,
  acceptFile,
  isMultiple,
  onChange,
  handleDrop,
  tooltip,
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: acceptFile,
    multiple: isMultiple,
    onDrop: handleDrop,
  });

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  };

  const activeStyle = {
    borderColor: '#2196f3',
  };

  const acceptStyle = {
    borderColor: '#00e676',
  };

  const rejectStyle = {
    borderColor: '#ff1744',
  };

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
  }), [
    isDragActive,
    isDragReject,
  ]);

  return (
    <Tooltip title={ tooltip }>
      <div {...getRootProps({ style })} className='divStyle'>
        <input {...getInputProps()} type='file' onChange={onChange}/>
        <p>{ hint }</p>
      </div>
    </Tooltip>
  );
};

UploadFile.propTypes = {
  hint: PropTypes.string.isRequired,
  acceptFile: PropTypes.string.isRequired,
  isMultiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
};

export default UploadFile;
