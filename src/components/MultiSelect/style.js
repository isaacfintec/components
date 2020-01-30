
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  formControl: {
    width: '100%',
    '&:hover $iconButtonHaveValues': {
      display: 'inline-flex',
    },
  },
  iconButton: {
    display: 'none',
    marginRight: theme.spacing(4),
    padding: theme.spacing(0.5),
    border: 'solid 1px',
    '& > span > svg': {
      fontSize: '1rem',
    },

    '&:hover': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.main,
      '& > span > svg': {
        color: theme.palette.primary.contrastText,
      },
    },
  },
  iconButtonEnable: {
    display: 'inline-flex',
  },
  iconButtonHaveValues: {
    // Pivot
  },
  selectDisabled: {
    '& > div > fieldset': {
      borderColor: `${theme.palette.primary.main} !important`,
      borderWidth: '2px',
    },
  },
}));
