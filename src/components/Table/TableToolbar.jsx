import React, { Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Tooltip, IconButton, Typography, Toolbar, Grid,
} from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Add, Delete, FilterList } from '@material-ui/icons';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  actions: {
    color: theme.palette.text.secondary,
  },
  noPadding: {
    padding: 0,
  },
}));

const TableToolBar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    title,
    onAdd,
    canAdd,
    titleAdd,
  } = props;
  return (
    <Toolbar
      className={clsx(classes.root, classes.noPadding, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected}
              {' '}
seleccionados
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              {title}
            </Typography>
          )}
        </Grid>

        <Grid item className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Eliminar">
              <IconButton aria-label="Eliminar">
                <Delete />
              </IconButton>
            </Tooltip>
          ) : (
            <Fragment>
              {
                canAdd && (
                  <Tooltip title={titleAdd}>
                    <IconButton onClick={onAdd} aria-label={titleAdd}>
                      <Add />
                    </IconButton>
                  </Tooltip>
                )
              }
              <Tooltip title="Filtrar lista">
                <IconButton aria-label="Filtrar lista">
                  <FilterList />
                </IconButton>
              </Tooltip>
            </Fragment>
          )}
        </Grid>
      </Grid>
    </Toolbar>
  );
};

TableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  canAdd: PropTypes.bool.isRequired,
};

export default TableToolBar;
