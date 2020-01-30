import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: '#fbfbfb',
  },
  nameContainer: {
    paddingTop: theme.spacing(4),
    textAlign: 'center',
  },
  capacityContainer: {
    '& > div': {
      textAlign: 'center',
      padding: theme.spacing(4, 0),
    },
  },
  divider: {
    backgroundColor: '#f1f1f1',
  },
  formContainer: {
    padding: theme.spacing(4),
    paddingLeft: '8vw',
    paddingRight: '8vw',
  },
  formButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > button': {
      padding: theme.spacing(1.5, 2),
    },
  },
}));
