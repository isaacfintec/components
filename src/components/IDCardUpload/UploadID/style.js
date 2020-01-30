import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  parent: {
    position: 'relative'
  },
  label: {
    padding: theme.spacing(0.5),
    backgroundColor: '#666',
    fontSize: 12,
    color: theme.palette.primary.contrastText,
    position: 'absolute',
    left: `calc((100% - ${theme.spacing(6)}px) / 2)`,
    top: 40
  }
}));

export default useStyles;
