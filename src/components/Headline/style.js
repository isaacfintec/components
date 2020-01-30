import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  headline: {
    fontSize: '1rem',
    height: 'auto',
    padding: '0px 5px',
    '& span': {
      fontSize: '1.2rem',
      fontWeight: 'normal',
    },
  },
  returnButton: {
    top: '-3px',
    width: '1rem',
    padding: '0px',
    '& svg': {
      fontSize: '1rem',
      color: theme.palette.primary.main,
    },
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
}));

export default useStyles;
