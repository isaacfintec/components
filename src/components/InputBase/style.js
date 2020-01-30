import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
  inputContainer: {
    border: 'none',
    padding: '0',
    width: '100%',
  },
  inputBase: {
    margin: 'auto',
    width: '100%',
    height: 'auto',
    '&:disabled:hover $buttonHover': {
      display: 'none',
    },
    '&:hover $buttonHover': {
      display: 'initial',
    },
    '& :not(.Mui-error).MuiInput-underline:after': {
      borderColor: '#4c5c68 !important',
      borderBottom: '1px solid',
    },
    '& $Mui-error input': {
      color: 'red',
    },
    '& :not(.Mui-error).MuiInput-underline.Mui-focused:before': {
      borderColor: '#4c5c68 !important',
      borderBottom: '2px solid',
    },
    '& label.Mui-focused:not($Mui-error)': {
      color: '#4c5c68 !important',
    },
    '& div.Mui-focused:not($Mui-error) fieldset': {
      borderColor: '#4c5c68 !important',
      borderBottom: '2px solid',
    },
    '& $Mui-error': {
      '& span svg': {
        backgroundColor: 'red !important',
        border: '1px solid',
        borderColor: 'red !important',
      },
    },
    '& $Mui-disabled': {
      color: '#4c5c68 !important',
    },
    '& div.Mui-disabled fieldset': {
      color: '#4c5c68 !important',
      borderColor: '#4c5c68 !important',
      border: '2px solid',
    },
    '& .MuiInput-underline.Mui-disabled:before': {
      borderBottom: '1px solid',
    },
  },
  buttonActive: {
    display: 'intial',
    border: 'none',
    padding: '0px',
    margin: '0px',
    borderColor: 'transparent !important',
    zIndex: '1500',
    '&:hover': {
      padding: '0px',
      margin: '0px',
      background: 'none !important',
    },
    '& span svg': {
      borderRadius: '20px',
      padding: '0px',
      margin: '0px',
      color: 'white',
      fontSize: '1rem',
      backgroundColor: '#36486b !important',
      border: '1px solid',
      borderColor: '#36486b !important',
    },
  },
  buttonDisabled: {
    display: 'none',
  },
  buttonHover: {
    display: 'none',
    border: 'none',
    zIndex: '1500',
    padding: '0px',
    margin: '0px',
    borderColor: 'transparent !important',
    '&:hover': {
      background: 'none !important',
    },
    '& span svg': {
      borderRadius: '20px',
      padding: '0px',
      margin: '0px',
      color: 'white',
      fontSize: '1rem',
      backgroundColor: '#36486b !important',
      border: '1px solid',
      borderColor: '#36486b !important',
    },
  },
}));

export default useStyles;
