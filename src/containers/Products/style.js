import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  container: {
    '& > div': {
      paddingTop: theme.spacing(4),
    },
  },
  containerActive: {
    boxShadow: '0 15px 32px 0 rgba(0,0,0,0.1)',
  },
  breadcrumbs: {
    fontSize: '0.8rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    '& > button': {
      width: '100%',
      maxWidth: '113px',
      height: '48px',
    },
  },
  formToCreateContainer: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4, 0),
    borderTop: '1px solid #F1F1F1',
  },
  formToCreate: {
    '& > form': {
      padding: theme.spacing(4),
      paddingTop: 0,
    },
  },
  form: {
    '& > div > div > div': {
      width: '100%',
    },
  },
  formButtonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button:first-child': {
      marginRight: theme.spacing(2),
    },
  },

}));
