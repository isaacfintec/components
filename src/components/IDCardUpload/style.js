import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 573,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  titleContainer: {},
  interactionContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  interaction: {
    flex: 1,
    margin: theme.spacing(0, 1)
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: 16,
    fontWeight: 'bold'
  }
}));

export default useStyles;
