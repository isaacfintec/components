import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  newCreditRoot: {
    margin: 'auto',
    maxWidth: '1100px',
    minWidth: '1000px',
    height: 'auto',
    overflow: 'hidden',
    boxShadow: '-1px 2px 33px -17px rgba(0,0,0,0.1)',
  },
  firstTitle: {
    borderTop: 'none !important',
  },
  newCreditContainer: {
    maxWidth: '1023px',
    padding: '20px 20px 32px 20px',
  },
  newCreditSection: {
    padding: '0px 0px 32px 0px',
    justifyContent: 'space-around',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    '& > div:first-child ': {
      borderRadius: '10px',
      overflow: 'hidden',
    },
  },
  newCreditSectionB: {
    flexWrap: 'nowrap',
    padding: '0px',
    margin: '0px',
  },
  tableTitle: {
    color: theme.palette.text.primary,
    borderTop: '1px solid #f1f1f1',
    padding: '32px 0px 24px 0px',
  },
  buttonsSection: {
    width: '100%',
    margin: '0px',
    padding: '0px',
    '& button, button:disabled': {
      width: '101px',
      fontSize: '14.2px',
      fontWeight: 'normal',
      marginLeft: '24px',
      textTransform: 'capitalize',
    },
  },
}));
