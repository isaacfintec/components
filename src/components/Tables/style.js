import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  tableRoot: {
    width: '100%',
    height: 'auto',
    border: 'none',
    boxShadow: 'none',
  },
  labelButton: {
    width: 'inherit !important',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vertIcon: {
    color: '#949494 !important',
    display: 'inline-block',
    float: 'right',
  },
  containerTable: {
    fontFamily: theme.typography.fontFamily,
    padding: '0',
    '& table, tbody, tr, td svg': {
      fontSize: '1.2rem',
      color: 'lightgray',
    },
    '& table, tbody, tr, td input:checked': {
      '& + svg': {
        color: theme.palette.primary.main,
      },
      '& + div > svg': {
        color: theme.palette.primary.main,
      },
    },
    '& thead tr th p': {
      color: '#979797',
      '& svg': {
        color: '#979797',
      },
    },
    '& table tbody tr': {
      height: '61px !important',
    },
    '& table thead tr th': {
      minHeight: '56px !important',
      maxHeight: '56px !important',
      height: '56px !important',
      textAlign: 'left',
      padding: '0px 0px 0px 10px',
      backgroundColor: '#fbfbfb',
      '& button': {
        marginRight: '15px',
      },
    },
    '& td': {
      textAlign: 'left',
      padding: '10px 0px 10px 10px',
      color: theme.palette.text.primary,
      '&:nth-child(6) p div': {
        margin: '0px',
        padding: '0px 4px 3px 0px',
        height: '40px !important',
      },
      '&:nth-child(6) imput': {
        padding: '0px',
        margin: '0px',
        border: '1px solid red !important',
      },
      '&:nth-child(6) fieldset': {
        padding: '0px',
        margin: '0px',
        height: '40px !important',
      },
      '&:nth-child(6) svg': {
        fontSize: '15px',
        // border: '1px solid red !important',
      },
    },
    '& td div': {
      maxWidth: '80px',
    },
  },
  popoverContainer: {
    padding: '5px 5px',
    minWidth: '200px',
    borderRadius: '15px',
    '& button': {
      width: '100% !important',
      color: '#979797',
      fontWeight: 'normal',
      borderRadius: '0px',
      border: 'none',
      '&:not(:last-child)': {
        borderBottom: '1px solid rgba(247, 247, 247, 1)',
      },
      '&:hover': {
        backgroundColor: 'rgba(247, 247, 247, 1)',
      },
      '& span': {
        justifyContent: 'left',
        textTransform: 'none',
      },
    },
  },
}));

export default useStyles;
