import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  breadcrumbs: {
    fontSize: '0.8rem',
    height: 'auto',
    padding: '0px',
    '& li': {
      padding: '2px',
      margin: '0px',
    },
    '& li:not(:last-child)': {
      color: theme.palette.primary.disabled,
    },
  },
  separatorA: {
    fontSize: '12px',
    padding: '0',
    margin: '0',
  },
}));

export default useStyles;
