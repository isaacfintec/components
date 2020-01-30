/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, Button, FormControl, FormControlLabel,
  DialogActions, MenuItem, TextField, Grid, Chip, FormLabel, RadioGroup, Radio, useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import Editor from '../Comments/Editor';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  menu: {
    width: 200,
  },
  tags: {
    margin: theme.spacing(1),
  },
}));

const ModalNewTicket = ({
  groups, priorities, open, handleClose, handleCreateTicket,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // TODO Change for an API
  const types = [{
    _id: '5d1cf2ccd3273a35d35940bc',
    name: 'Issue',
  }, {
    _id: '5d1cf2ccd3273a35d35940bd',
    name: 'Problem',
  }, {
    _id: '5d1cf2ccd3273a35d35940be',
    name: 'Task',
  }];
  const tags = [{
    _id: '5d1d166894b8c636b8495ed8',
    name: 'Error',
    normalized: 'error',
    __v: 0,
  },
  {
    _id: '5d1d166894b8c636b8495ee8',
    name: 'Líquidos',
    normalized: 'liquidos',
    __v: 0,
  },
  {
    _id: '5d1d166894b8c636b8495ef8',
    name: 'Nóminas',
    normalized: 'nominas',
    __v: 0,
  }];

  const [values, setValues] = React.useState({
    subject: '',
    type: '',
    group: '',
    priority: '',
    issue: '',
    tags: [],
  });

  const [errors, setErros] = React.useState({});

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDeleteTag = name => (event) => {
    // TODO: Handle delete tag
  };

  const handleEditorChange = (text) => {
    setValues({ ...values, issue: text });
  };

  const priorityColor = (name) => {
    switch (name) {
      case 'Urgente': return 'secondary';
      default: return 'primary';
    }
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
      <DialogTitle>Nuevo ticket</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="subject-full-width"
              label="Título"
              helperText={errors.subject || ''}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange('subject')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="group-select"
              select
              fullWidth
              label="Grupo"
              value={values.group}
              onChange={handleChange('group')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Selecciona un grupo"
              margin="normal"
            >
              {groups.map(group => (
                <MenuItem key={group._id} value={group._id}>
                  {group.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="type-select"
              select
              label="Tipo"
              value={values.type}
              onChange={handleChange('type')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Selecciona un tipo"
              margin="normal"
            >
              {types.map(type => (
                <MenuItem key={type._id} value={type._id}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={9}>
            <FormLabel>Tags</FormLabel>
            {tags.map(tag => (
              <Chip
                className={classes.tags}
                color="primary"
                key={tag._id}
                label={tag.name}
                onDelete={handleDeleteTag(tag._id)}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel color="textSecondary">Prioridad</FormLabel>
              <RadioGroup
                row
                aria-label="prioridad"
                name="priority"
                value={values.priority}
                onChange={handleChange('priority')}
              >
                {priorities.map(priority => (
                  <FormControlLabel
                    key={priority.id}
                    value={priority.id}
                    control={<Radio color={priorityColor(priority.name)} />}
                    label={priority.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Editor handleEditorChange={handleEditorChange} text={values.issue} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
        Cancel
        </Button>
        <Button color="primary" onClick={handleCreateTicket(values)}>
        Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalNewTicket.propTypes = {
  groups: PropTypes.array.isRequired,
  priorities: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCreateTicket: PropTypes.func.isRequired,
};

export default ModalNewTicket;
