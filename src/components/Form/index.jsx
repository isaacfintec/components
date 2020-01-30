import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button, Grid, Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CurrencyInput from '../CurrencyInput';
import NumberInput from '../NumberInput';
import InputText from '../InputText';
import InputDropdown from '../InputDropdown';
import useStyles from './style';

const Form = (props) => {
  const {
    title,
    active,
    onSubmit,
    initValues,
    onCancel,
  } = props;

  const classes = useStyles();
  const [isActive, setIsActive] = useState(active);
  const [editingPhase, setEditingPhase] = useState('new');
  const [localValues, setlocalValues] = useState(initValues);
  const [newValues, setNewValues] = useState(initValues);

  const getValue = input => localValues[input] || '';

  useEffect(() => {
    setlocalValues({ ...initValues });
  }, [initValues]);

  const handleOnChange = input => (event, cleanValue) => {
    const {
      target: { value },
    } = event;
    const changedValues = { ...newValues, [input]: cleanValue };
    setNewValues(changedValues);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsActive(false);
    setEditingPhase('new');
    onSubmit(newValues);
  };

  const handleCancel = () => {
    setEditingPhase('new');
    setIsActive(false);
    onCancel(initValues);
  };

  const handleClickToEdit = (e) => {
    setIsActive(true);
    setEditingPhase('edit');
  };

  return (
    <form
      className={classes.form}
      onSubmit={handleOnSubmit}>
      <Grid container justify="flex-start" >
        <Typography
          variant="subtitle1"
          className={classes.formTtitle}>
          { title }
        </Typography>
        <IconButton
          onClick={ handleClickToEdit }
          tabIndex="-1"
          color='primary'
          edge={false}
          className={classes.editIcon}
        >
          <EditIcon color='primary'/>
        </IconButton>
      </Grid>
      <Grid container spacing={2} justify="center" >
        <Grid item sm={4}>
          <InputText
            active={isActive}
            label='Nombre'
            onChange={handleOnChange('name')}
            editingPhase={editingPhase}
            value={getValue('name')}
          />
        </Grid>
        <Grid item sm={4}>
          <InputText
            active={isActive}
            label='Aplica'
            onChange={handleOnChange('apply')}
            editingPhase={editingPhase}
            value={getValue('apply')}
          />
        </Grid>
        <Grid item sm={4}>
          <InputDropdown
            active={isActive}
            onSelect={handleOnChange('period')}
            editingPhase={editingPhase}
            listValues={getValue('period')}
            label='Periodo'
          />
        </Grid>
        <Grid item sm={4}>
          <InputText
            active={isActive}
            label='Plazos'
            onChange={handleOnChange('deadlines')}
            editingPhase={editingPhase}
            value={getValue('deadlines')}
          />
        </Grid>
        <Grid item sm={4}>
          <CurrencyInput
            active={isActive}
            editingPhase={editingPhase}
            onChange={handleOnChange('amount')}
            label='Monto'
            value={getValue('amount')}
          />
        </Grid>
        <Grid item sm={4}>
          <NumberInput
            active={isActive}
            editingPhase={editingPhase}
            onChange={handleOnChange('rate')}
            label='Tasa'
            value={getValue('rate')}
          />
        </Grid>
      </Grid>
      {
        isActive && <Grid container className={classes.formButtonContainer} justify="flex-end" >
          <Button
            onClick={handleCancel}
            className={clsx(classes.cancelButton, classes.formButton)} >
            Cancelar
          </Button>
          <Button
            variant="outlined"
            type="submit"
            className={clsx(classes.saveButton, classes.formButton)} >
            Guardar
          </Button>
        </Grid>
      }
    </form>
  );
};

Form.defaultProps = {
  active: false,
};

export default Form;
