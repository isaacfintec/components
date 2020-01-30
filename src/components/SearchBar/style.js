import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  inputBase: {
    width: '100%',
    backgroundColor: '#fff',
    padding: '8px 12px',
    border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: '8px',
    '&:hover, &:active, &:focus, &:focus-within': {
      borderColor: theme.palette.primary.main,
    },
  },
  icon: {
    color: 'rgba(44,62,80,0.54)',
  },
}));
