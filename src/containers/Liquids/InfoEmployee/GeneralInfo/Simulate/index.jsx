/* eslint-disable import/no-named-as-default-member */
import React,
{
  Fragment,
  useState,
  useRef,
  useEffect,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Table from '../../../../../components/Table';
import BackButton from '../../../../../components/BackButton';
import { BUTTON, CURRENCY } from '../../../../../components/Table/TableCellTypes';
import ProductApi from '../../../../../api/products';
import CreditApi from '../../../../../api/credits';
import Loading from '../../../../../components/Loading';
import ModalLoad from '../../../../../components/ModalLoad';
import ModalUploadFiles from '../../../../../components/ModalUploadFiles';

const headRows = [
  {
    id: 'product',
    numeric: false,
    disablePadding: true,
    label: 'PRODUCTO',
    key: 'product',
  },
  {
    id: 'term',
    numeric: false,
    disablePadding: true,
    label: 'PLAZO',
    key: 'term',
  },
  {
    id: 'loanAmount',
    numeric: false,
    disablePadding: true,
    label: 'MONTO PRÈSTADO',
    key: 'loanAmount',
    type: CURRENCY,
  },
  {
    id: 'payAmount',
    numeric: false,
    disablePadding: true,
    label: 'MONTO A PAGAR',
    key: 'payAmount',
    type: CURRENCY,
  },
  {
    id: 'yourLiquid',
    numeric: false,
    disablePadding: true,
    label: 'LIQUIDO NECESARIO',
    key: 'yourLiquid',
    type: CURRENCY,
  },
  {
    id: 'options',
    numeric: false,
    disablePadding: true,
    label: '',
    key: 'options',
    type: BUTTON,
  },
];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const SimulateLiquid = ({ history, match }) => {
  const classes = useStyles();

  const { employeeId } = match.params;

  const formElement = useRef(null);

  const [simulate, setSimulate] = useState([]);
  const [products, setProducts] = useState([{}]);
  const [terms, setTerms] = useState([{}]);
  const [isLoading, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUploadFiles, setOpenUploadFiles] = useState(false);

  const [values, setValues] = useState({
    product: '',
    productName: '',
    amount: '',
    term: '',
  });

  const mockSimulacion = [
    {
      _id: `${values.productName}-${values.term}`,
      product: values.productName,
      term: `${values.term} quincenas`,
      loanAmount: `${values.amount}`,
      payAmount: `${(values.amount * 1.20).toFixed(2)}`,
      yourLiquid: `${(values.amount * 1.20 / values.term).toFixed(2)}`,
      options: 'Apartar',
    },
  ];

  const handleChangeProduct = (event) => {
    const val = event.target.value;
    const findProduct = products.find(e => e._id === val);
    setValues({ ...values, productName: findProduct.name, product: val });
    setTerms(findProduct.periods);
  };

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSimulate = () => {
    // setOpenUploadFiles(true);
    setLoad(true);
    const form = formElement.current;
    const validity = form.checkValidity();

    if (validity) {
      setSimulate(mockSimulacion);
    } else {
      form.reportValidity();
    }
    setLoad(false);
  };

  const handleBack = () => {
    history.push(`/liquids/${employeeId}`);
  };

  const fetchProducts = async () => {
    setLoad(true);
    const foundData = await ProductApi.index();
    if (foundData) {
      setProducts(foundData);
    }
    setLoad(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const eventCell = async () => {
    setOpen(true);
    const credit = {
      amount: Number(values.amount),
      period: values.term,
      employee: employeeId,
      comertialHouseProduct: values.product,
      holdOnDocuments: '5d7805dffa14c711252622fd',
    };
    if (credit) {
      await CreditApi.store(credit);
    }
  };

  const handleContinue = () => {
    history.push(`/liquids/${employeeId}`);
    setOpen(false);
  };

  const handleContinueStep = () => {
    setOpenUploadFiles(false);
  };

  const NumberFormatCustom = (props) => {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={ (val) => {
          onChange({
            target: {
              value: val.value,
            },
          });
        }}
        thousandSeparator
        prefix="$"
      />
    );
  };

  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  const mockFlow = {
    _id: '5d77f4c6c881d80fca114575',
    module: '5d77f4c6c881d80fca114571',
    action: 'holdOn',
    documents: [
      {
        _id: '5d77f4c6c881d80fca114578',
        name: 'documento A',
        description: 'chidori',
        url: 'https://amazons3.com/algo',
        delegation: '5d77f4c6c881d80fca114578',
      },
      {
        _id: '5d77f4c6c881d80fca114579',
        name: 'documento B',
        description: 'Rasengan',
        url: 'https://amazons3.com/algo',
        delegation: '5d77f4c6c881d80fca114579',
      },
    ],
  };

  return (
    <Fragment>
      <ModalUploadFiles
        open={openUploadFiles}
        title='Faltan de subir los siguientes archivos.'
        flow={mockFlow}
        handleContinue={handleContinueStep} />
      <ModalLoad
        title='Apartando Liquido'
        text='El liquido fue apartado.'
        open={open}
        isLoading={isLoading}
        textBtnContinue='Continuar'
        handleContinue={handleContinue}/>
      <BackButton handleBack={handleBack} />
      { isLoading && <Loading /> }
      <form ref={formElement} className={classes.container} validate="true" autoComplete="off">
        <Grid container direction="row" alignItems="center">
          <TextField
            id="standard-select-produc-name"
            select
            label="Producto"
            className={classes.textField}
            value={values.product}
            onChange={handleChangeProduct}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Selecciona tu producto"
            margin="normal"
            required
          >
            {products.map(option => (
              <MenuItem key={`key-${option._id}`} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="amount"
            label="Monto"
            className={classes.textField}
            value={values.amount}
            margin="normal"
            autoFocus={true}
            helperText="Ingresa el monto que deseas"
            onChange={handleChange('amount')}
            required
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
          <TextField
            id="standard-select-produc-term"
            select
            label="Plazo"
            className={classes.textField}
            value={values.term}
            onChange={handleChange('term')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Selecciona tu plazo"
            margin="normal"
            required
          >
            {terms.map(option => (
              <MenuItem key={option} value={option}>
                {`${option} quincenas`}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            onClick={handleSimulate}
            disabled={isLoading}>
              Simular
          </Button>
        </Grid>
      </form>
      <Table
        data={simulate}
        headers={headRows}
        eventCell={eventCell} >
      </Table>
    </Fragment>
  );
};

SimulateLiquid.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SimulateLiquid;
