import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import Loading from '../Loading';

import './FullDialog.css';

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const FullDialog = ({
  title,
  isOpen,
  onClose,
  onSave,
  isLoading,
  children,
}) => (
  <Dialog
    fullScreen
    open={isOpen}
    onClose={onClose}
    TransitionComponent={Transition}
  >
    <AppBar className="group__app-bar">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h6"
          className="full-dialog__title"
        >
          { title }
        </Typography>
        <Button
          color="inherit"
          onClick={
            isLoading
              ? () => {}
              : onSave
          }
        >
          {
            isLoading
              ? <CircularProgress />
              : <SaveIcon />
          }
        </Button>
      </Toolbar>
    </AppBar>
    <div className="full-dialog__block" />
    <div className="full-dialog__bg">
      <Container className="full-dialog__container">
        { children }
        { isLoading && <Loading /> }
      </Container>
    </div>
  </Dialog>
);

FullDialog.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

FullDialog.defaultProps = {
  title: '',
  isLoading: false,
};

export default FullDialog;
