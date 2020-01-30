import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: 'none',
    position: 'relative',
    border: 'solid 1px #fbfbfb',
  },
  cardHeader: {
    backgroundColor: theme.palette.background.main,
    padding: theme.spacing(2),
    '& > div > span:first-child': {
      fontSize: '1rem',
      letterSpacing: '0.2px',
      fontWeight: 'bold'
    }
  }
}));

export default useStyles;
