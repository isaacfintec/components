/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, Button,
  DialogActions, FormLabel, useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

const ModalConfirm = ({
  title, text, open, textBtnClose, handleClose, textBtnContinue, handleContinue,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormLabel>
          {text}
        </FormLabel>
      </DialogContent>
      <DialogActions>
        {textBtnClose && <Button
          color="primary"
          variant="contained"
          onClick={handleClose}>
          {textBtnClose}
        </Button>
        }
        <Button
          color="primary"
          variant="contained"
          onClick={handleContinue}>
          {textBtnContinue}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalConfirm.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textBtnClose: PropTypes.string,
  textBtnContinue: PropTypes.string.isRequired,
  handleClose: PropTypes.func,
  handleContinue: PropTypes.func.isRequired,
};

export default ModalConfirm;
