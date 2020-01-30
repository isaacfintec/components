import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

export default makeStyles(theme => ({
  tr: {
    borderBottom: 'solid 1px',
    borderBottomColor: fade('#F1F1F1', 0.5),
    '&:hover': {
      boxShadow: '0px 40px 600px 4px rgba(0,0,0,0.12)',
      cursor: 'pointer',
      '& > td': {
        color: theme.palette.primary.main,
      },
    },
  },
  trActive: {
    boxShadow: '0px -48px 200px 4px rgba(0,0,0,0.12)',
    '&:hover': {
      boxShadow: '0px -48px 200px 4px rgba(0,0,0,0.12)',
    },
  },
  trEdited: {
    borderLeft: 'solid 4px #64a057',
  },
  td: {
    padding: theme.spacing(1, 2),
    textTransform: 'lowercase',
    color: theme.palette.primary.dark,
    '&::first-letter': {
      textTransform: 'uppercase',
    },
  },
  editButton: {
    display: 'flex',
    justifyContent: 'space-between',
    '& svg': {
      fontSize: '1rem',
    },
  },
  trCollapse: {
    display: 'none',
  },
  collapse: {
    padding: theme.spacing(6),
  },
  collapseActive: {
    boxShadow: '0px 40px 600px 4px rgba(0,0,0,0.12)',
    '&hover:': {
      boxShadow: 'none',
    },
  },
}));
