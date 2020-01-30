import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
  },
  editIcon: {
    padding: theme.spacing(1),
    display: 'inline-block',
    '&:hover': {
      // background: 'none',
      '& svg': {
        color: theme.palette.primary.main,
      },
    },
    '& svg': {
      color: '#8D96A0',
      fontSize: '1.3rem',
    },
  },
  editIconActive: {
    '& svg': {
      color: theme.palette.primary.main,
    },
  },
  formButtonContainer: {
    paddingTop: theme.spacing(3),
    '& > button': {
      textTransform: 'capitalize',
    },
    '& > button:first-child': {
      marginRight: theme.spacing(1),
    },
  },
}));

export default useStyles;
