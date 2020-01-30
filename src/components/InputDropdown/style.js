import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    border: 'none',
    padding: '0',
    width: '100%',
    position: 'relative',
    minWidth: '100%',
  },
  inputDropdown: {
    margin: 'auto',
    width: '100%',
    height: 'auto',
    '& label.Mui-focused:not(.Mui-error)': {
      color: '#4c5c68 !important',
    },
    '& label': {
      color: '#4c5c68 !important',
    },
    '& .MuiSelect-root': {
      paddingLeft: '10px',
      textAlign: 'left',
    },
    '& .MuiSelect-root:focus': {
      backgroundColor: 'transparent',
    },
    '& div.Mui-focused:not(.Mui-error) fieldset': {
      borderColor: '#4c5c68 !important',
      borderBottom: '2px solid',
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
    '& .MuiInput-underline:after': {
      borderBottom: 'none',
    },
    '&:focus div fieldset': {
      border: '5px solid red',
    },
  },
}));

export default useStyles;
