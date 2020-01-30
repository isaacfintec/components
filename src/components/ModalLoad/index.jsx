/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, Button,
  DialogActions, FormLabel, useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import Loading from '../Loading';

const ModalLoad = ({
  title, text, open, isLoading, textBtnContinue, handleContinue,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormLabel>
          { isLoading ? <Loading /> : text }
        </FormLabel>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinue}
          disabled={isLoading}>
          {textBtnContinue}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalLoad.propTypes = {
  open: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  textBtnContinue: PropTypes.string.isRequired,
  handleContinue: PropTypes.func.isRequired,
};

export default ModalLoad;
