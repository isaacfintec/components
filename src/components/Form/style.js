import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    border: '1px solid gray',
    padding: '10px 30px 30px 30px',
  },
  editIcon: {
    fontSize: '1rem',
    padding: '5px',
    display: 'inline-block',
    color: '#4c5c68',
    '&:hover': {
      background: 'none',
    },
    '& svg': {
      color: '#4c5c68',
    },
  },
  formTtitle: {
    display: 'inline-block',
    height: '100%',
    border: 'none',
    fontSize: '1rem',
    padding: '5px',
  },
  formButtonContainer: {
    padding: '5px',
  },
  formButton: {
    height: '100%',
    color: '#ffffff',
    marginLeft: '5px',
  },
  cancelButton: {
    color: '#564D4A',
    '&:hover': {
      background: 'lightgray',
    },
  },
  saveButton: {
    background: '#2C3E50',
    '&:hover': {
      background: '#2C3E50',
    },
  },
}));

export default useStyles;
