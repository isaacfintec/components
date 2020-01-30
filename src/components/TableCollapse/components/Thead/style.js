import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  header: {
    backgroundColor: '#FBFBFB',
  },
  th: {
    color: theme.palette.primary.main,
    padding: theme.spacing(2),
    textAlign: 'left',
    fontWeight: 'normal',
  },
}));
