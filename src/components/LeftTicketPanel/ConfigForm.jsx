/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import { TextField, MenuItem, Chip } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 2,
  },
  textField: {
    fontSize: 12,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 120,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  fontResize: {
    fontSize: 12,
  },
}));

const ConfigForm = (props) => {
  const classes = useStyles();
  const TYPES = ['Task', 'Issue'];
  const {
    ticket, groups,
  } = props;
  const {
    tags, group, type, priority, dueDate,
  } = ticket;
  const [values, setValues] = React.useState({
    type,
    group,
    tags,
    dueDate,
    priority,
  });

  // TODO: Handle values on lists
  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeDate = (date) => {
    setValues({ ...values, dueDate: date });
  };

  const renderTypes = types => (
    <TextField
      id="types-list"
      select
      label="Tipo"
      className={classes.textField}
      value={values.type}
      onChange={handleChange('type')}
      margin="normal"
      InputProps={{
        classes: {
          input: classes.fontResize,
        },
      }}
    >
      {types.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );

  const renderGroups = () => (
    <TextField
      id="groups-list"
      select
      label="Grupo"
      className={classes.textField}
      value={values.group}
      onChange={handleChange('group')}
      margin="normal"
      InputProps={{
        classes: {
          input: classes.fontResize,
        },
      }}
    >
      {groups && groups.map(option => (
        <MenuItem key={option._id} value={option.name}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );

  const renderTags = () => (
    <div className={classes.textField}>
      <p>Tags</p>
      {tags && tags.map(tag => (
        <Chip key={tag._id} label={tag.name} color="primary" />
      ))}
    </div>
  );

  const renderPriorities = () => (
    <TextField
      id="priorities-list"
      select
      label="Prioridades"
      className={classes.textField}
      value={values.priority}
      onChange={handleChange('priority')}
      margin="normal"
      InputProps={{
        classes: {
          input: classes.fontResize,
        },
      }}
    >
      {type && type.priorities.map(option => (
        <MenuItem key={option.id} value={option.name}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );

  const renderDueDate = () => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className={classes.textField}
        margin="normal"
        label="Fecha límite"
        value={values.dueDate}
        onChange={handleChangeDate}
        InputProps={{
          classes: {
            input: classes.fontResize,
          },
        }}
      />
    </MuiPickersUtilsProvider>
  );

  return (
    <Paper>
      <form className={classes.container} noValidate autoComplete="off">
        {renderTypes(TYPES)}
        {renderPriorities()}
        {renderGroups()}
        {renderDueDate()}
        {renderTags()}
      </form>
    </Paper>
  );
};

ConfigForm.propTypes = {
  ticket: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
};

export default ConfigForm;
