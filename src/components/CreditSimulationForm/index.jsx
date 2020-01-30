import React, {
  memo,
  useState,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import InputDropdown from '../InputDropdown';
import InputText from '../InputText';
import CurrencyInput from '../CurrencyInput';

import { toMoneyFormat } from '../../helpers';
import useStyles from './style';

const CreditSimulationForm = ({
  name,
  totalCapacity,
  availableCapacity,
  onHoldCapacity,
  products,
  onSimulate,
  values,
}) => {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({});
  const [currentProduct, setCurrentProduct] = useState(0);

  const PRODUCTS = useMemo(() => (
    products.map((product, index) => ({
      label: product.name,
      value: index,
    }))
  ), [products]);

  const TYPE = useMemo(() => {
    const { type = '' } = products[currentProduct] || {};
    return type;
  }, [currentProduct]);

  const PERIODS = useMemo(() => {
    const { periods = [] } = products[currentProduct] || {};
    return periods.map(period => ({
      label: period,
      value: period,
    }));
  }, [currentProduct]);

  useEffect(() => {
    setFormValues(formValues);
  }, [values]);

  useEffect(() => {
    setFormValues({});
  }, [currentProduct]);

  const getFormValue = input => formValues[input];

  const handleOnChangeProduct = (event, value) => {
    setCurrentProduct(value);
  };

  const handleOnChange = input => (value, customValue) => {
    // eslint-disable-next-line no-underscore-dangle
    const _value = value.constructor.name === 'Class' ? customValue : value;
    const newFormValues = { ...formValues, [input]: _value };
    setFormValues(newFormValues);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const product = products[currentProduct];
    const newFormValues = { ...formValues, product };
    onSimulate(newFormValues, event);
  };

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.nameContainer}>
          <Typography variant="h5">
            { name }
          </Typography>
        </div>
        <Grid container className={classes.capacityContainer}>
          <Grid item sm={4}>
            <Typography variant="h5">
              { toMoneyFormat(totalCapacity) }
            </Typography>
            <Typography variant="body1">
              Capacidad total
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography variant="h4">
              { toMoneyFormat(availableCapacity) }
            </Typography>
            <Typography variant="body1">
              Líquido disponible para solicitar créditos
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography variant="h5">
              { toMoneyFormat(onHoldCapacity) }
            </Typography>
            <Typography variant="body1">
              Líquido apartado
            </Typography>
          </Grid>
        </Grid>
        <div>
          <Divider className={classes.divider} />
        </div>
        <div className={classes.formContainer}>
          <form onSubmit={handleOnSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={3}>
                <InputDropdown
                  label="Producto"
                  onSelect={handleOnChangeProduct}
                  listValues={PRODUCTS}
                />
              </Grid>
              <Grid item sm={3}>
                <CurrencyInput
                  label="Monto"
                  onChange={handleOnChange('amount')}
                  value={getFormValue('amount')}
                />
              </Grid>
              <Grid item sm={3}>
                <InputText
                  label="Periodo"
                  value={TYPE}
                />
              </Grid>
              <Grid item sm={3}>
                <InputDropdown
                  label="Plazos"
                  variant="outlined"
                  onSelect={handleOnChange('periods')}
                  listValues={PERIODS}
                />
              </Grid>
              <Grid item sm={12} className={classes.formButton}>
                <Button variant="contained" color="primary" type="submit">
                  Simular crédito
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

CreditSimulationForm.propTypes = {
  name: PropTypes.string,
  totalCapacity: PropTypes.number,
  availableCapacity: PropTypes.number,
  onHoldCapacity: PropTypes.number,
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    periods: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
  })),
  onSimulate: PropTypes.func,
  values: PropTypes.object,
};

CreditSimulationForm.defaultProps = {
  name: '',
  totalCapacity: 0,
  availableCapacity: 0,
  onHoldCapacity: 0,
  products: [],
  onSimulate: () => {},
  values: {},
};

export default memo(CreditSimulationForm);
