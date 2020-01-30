import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  newCreditRoot: {
    margin: 'auto',
    maxWidth: '1100px',
    padding: '10px',
    boxShadow: '-1px 2px 33px -17px rgba(0,0,0,0.4)',
  },
  breadcrumbs: {
    fontSize: '0.8rem',
    height: 'auto',
    padding: '5px',
  },
  clientName: {
    height: 'auto',
    padding: '5px',
  },
  firstTitle: {
    borderTop: 'none !important',
  },
  newCreditSection: {
    padding: '0px 0px 32px 0px',
    justifyContent: 'space-around',
    flexWrap: 'nowrap',
    '& > div:first-child ': {
      borderRadius: '10px',
      overflow: 'hidden',
    },
  },
  tableTitle: {
    color: theme.palette.text.primary,
    borderTop: '1px solid lightgray',
    padding: '32px 0px 24px 0px',
  },
  separatorA: {
    fontSize: '16px',
    padding: '0',
    margin: '0',
  },
  separatorB: {
    fontSize: '20px',
    padding: '0',
    margin: '0',
    textAlign: 'right',
  },
  buttonsSection: {
    padding: '0px 32px',
    // border: '1px solid red',
    '& button, button:disabled': {
      width: '101px',
      fontSize: '14.2px',
      marginLeft: '24px',
      // border: '1px solid red',
      textTransform: 'capitalize',
    },
  },
}));
