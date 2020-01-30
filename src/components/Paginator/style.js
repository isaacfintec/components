import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  paginator: {
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'center',
  },
  iconButton: {
    padding: theme.spacing(1),
    '& > span': {
      fontSize: '0.8rem',
      width: '1rem',
      height: '1rem',
    },
    '& > span > svg': {
      fontSize: '0.8rem',
    },
  },
  iconButtonActive: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));
