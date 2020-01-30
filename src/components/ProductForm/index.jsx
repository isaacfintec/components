import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CurrencyInput from '../CurrencyInput';
import NumberInput from '../NumberInput';
import InputText from '../InputText';
import InputDropdown from '../InputDropdown';
import MultiSelect from '../MultiSelect';
import useStyles from './style';

const NEW_STATE = 'new';
const EDIT_STATE = 'edit';

const TYPES = [
  { value: 'semanal', label: 'Semanal' },
  { value: 'quincenal', label: 'Quincenal' },
  { value: 'mensual', label: 'Mensual' },
];

const LAPSES_RANGE = new Array(100).fill(undefined).map((value, index) => index + 1);

const Form = (props) => {
  const {
    title,
    active,
    onSubmit,
    values,
    onCancel,
    editable,
  } = props;

  const classes = useStyles();
  const [isActive, setIsActive] = useState(active);
  const [editingPhase, setEditingPhase] = useState(NEW_STATE);
  const [localValues, setlocalValues] = useState(values);

  const getValue = input => localValues[input] || '';

  useEffect(() => {
    setlocalValues({ ...values });
  }, [values]);

  useEffect(() => {
    if (!editable) setIsActive(true);
  }, [editable]);


  const handleOnChange = input => (value) => {
    const changedValues = { ...localValues, [input]: value };
    setlocalValues(changedValues);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsActive(false);
    setEditingPhase(NEW_STATE);
    onSubmit(localValues);
  };

  const handleCancel = () => {
    setEditingPhase(NEW_STATE);
    setIsActive(false);
    onCancel(values);
  };

  const handleClickToEdit = () => {
    setIsActive(true);
    setEditingPhase(EDIT_STATE);
  };

  return (
    <form
      onSubmit={handleOnSubmit}>
      <div className={classes.titleContainer}>
        <Typography
          variant="subtitle1"
        >
          { title }
        </Typography>
        {
          editable && (
            <IconButton
              onClick={handleClickToEdit}
              tabIndex="-1"
              className={clsx(
                classes.editIcon,
                { [classes.editIconActive]: isActive },
              )}
            >
              <EditIcon color='primary'/>
            </IconButton>
          )
        }
      </div>
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
            onSelect={handleOnChange('type')}
            editingPhase={editingPhase}
            listValues={TYPES}
            label='Periodo'
          />
        </Grid>
        <Grid item sm={4}>
          <MultiSelect
            label='Plazos'
            values={getValue('periods') || []}
            options={LAPSES_RANGE}
            onChange={handleOnChange('periods')}
            disabled={!isActive}
            variant={editingPhase === NEW_STATE ? 'outlined' : 'standard'}
          />
        </Grid>
        <Grid item sm={4}>
          <CurrencyInput
            active={isActive}
            editingPhase={editingPhase}
            onChange={handleOnChange('maxAmount')}
            label='Monto'
            value={getValue('maxAmount')}
          />
        </Grid>
        <Grid item sm={4}>
          <NumberInput
            active={isActive}
            editingPhase={editingPhase}
            onChange={handleOnChange('interestRate')}
            label='Tasa'
            value={getValue('interestRate')}
          />
        </Grid>
      </Grid>
      {
        isActive && (
          <Grid container className={classes.formButtonContainer} justify="flex-end" >
            <Button
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              type="submit"
              color="primary"
            >
              Guardar
            </Button>
          </Grid>
        )
      }
    </form>
  );
};

Form.protoTypes = {
  title: PropTypes.string,
  active: PropTypes.bool,
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  onCancel: PropTypes.func,
  editable: PropTypes.bool,
};
Form.defaultProps = {
  title: '',
  values: {},
  onSubmit: () => {},
  onCancel: () => {},
  active: false,
  editable: true,
};

export default Form;
