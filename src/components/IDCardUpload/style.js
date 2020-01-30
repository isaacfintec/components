import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 573,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  titleContainer: {
    height: '56px',
    padding: '17px 24px 19px 24px',
    backgroundColor: '#fbfbfb',
    marginBottom: '24px',
    '& p, span svg': {
      color: '#979797',
    },
  },
  interactionContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  toggleButton: {
    top: '-3px',
    width: '1.5rem',
    padding: '0px',
    '& svg': {
      fontSize: '1.5rem',
      color: theme.palette.primary.main,
    },
    '&:hover': {
      backgroundColor: 'ligthgray',
    },
  },
  mainContainer: {
    flexWrap: 'nowrap',
    padding: '0px 0px 24px',
  },
  interaction: {
    flex: 1,
    margin: theme.spacing(0, 1),
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: 16,
    fontWeight: 'bold',
  }
}));

export default useStyles;
