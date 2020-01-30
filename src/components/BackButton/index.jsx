import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBackIos';

const BackButton = ({ handleBack, isDisabled }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={handleBack}
    disabled={isDisabled}>
    <ArrowBack />
  </Button>
);

BackButton.propTypes = {
  handleBack: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

export default BackButton;
