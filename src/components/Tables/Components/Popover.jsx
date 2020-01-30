import React, { useState, useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ReactToPrint from 'react-to-print';

const tableButtons = [
  { id: 1, label: 'Pantalla completa' },
  { id: 2, label: 'Descargar' },
  { id: 3, label: 'Imprimir' },
  { id: 4, label: 'Compartir' },
];

const CustomPopover = (props) => {
  const {
    element,
    classes,
    handleClose,
    handleClickOnButton,
    componentRef,
  } = props;

  const [anchorEl, setAnchorEl] = useState(element);

  useEffect(() => {
    setAnchorEl(element);
  }, [element]);

  const open = Boolean(anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Grid
        container
        className={classes.popoverContainer}
        direction="column"
        justify="center"
        alignItems="center"
      >
        {
          tableButtons.map((item, index) => (
            item.id === 3 ? <ReactToPrint
              key={index}
              trigger={() => (
                <Button
                  variant="outlined"
                  onClick={handleClickOnButton(item)}
                  className={classes.popoverButtons}
                >
                  {item.label}
                </Button>
              ) }
              content={() => componentRef.current}
            /> : <Button
              key={index}
              variant="outlined"
              onClick={handleClickOnButton(item)}
              className={classes.popoverButtons}
            >
              {item.label}
            </Button>
          ))
        }
      </Grid>
    </Popover>
  );
};

export default CustomPopover;
