/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button, makeStyles, Grid, TextField,
} from '@material-ui/core';

const useStyles = makeStyles({
  gridChild: {
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'center',
  },
});

const SearcherEmployee = ({
  name,
  label,
  onClickSearch,
}) => {
  const classes = useStyles();
  const formElement = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onClickSearch(formElement);
    }
  };

  return (
    <Fragment>
      <form ref={formElement} onSubmit={(e) => { e.preventDefault(); }}>
        <Grid container className={classes.gridChild}>
          <TextField
            id="standard-name"
            name={name}
            label={label}
            margin="normal"
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={ () => onClickSearch(formElement) } >
            Buscar
          </Button>
        </Grid>
      </form>
    </Fragment>
  );
};

SearcherEmployee.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClickSearch: PropTypes.func.isRequired,
};

export default SearcherEmployee;
