import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'realtive',
    width: '100%',
    maxWidth: '380px',
    height: '100%',
    display: 'flex',
    margin: 'auto',
    flexDirection: 'column',
    fontFamily: theme.typography.fontFamily,
    backgroundColor: '#f8f8f8',
  },
  box: {
    width: '100%',
    maxHeight: 'auto',
    '& h2': {
      margin: '0px',
      textAlign: 'center',
    },
    '& h3, h2': {
      fontWeight: 'normal',
      marginBottom: '0px',
    },
  },
  boxLabel: {
    textAlign: 'center',
  },
  headerCard: {
    minHeight: '121px',
    backgroundColor: '#f8f8f8',
  },
  middleCard: {
    minHeight: '100px',
    backgroundColor: '#f1f1f1',
  },
  footerCard: {
    minHeight: '148px',
    backgroundColor: '#eaeaea',
    '& h2:not($boxLabel)': {
      fontWeight: 'normal',
      fontSize: '34.3px',
    },
  },
  content: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    '& h2': {
      width: '100%',
      flex: '1',
      minHeight: '50px',
      maxHeight: '50px',
      textAlign: 'center',
    },
    '& h2:not($boxLabel)': {
      paddingTop: '20px',
      fontWeight: 'normal',
      fontSize: '24.3px',
    },
  },
  middleContent: {
    position: 'relative',
    maxWidth: '1px',
    alignSelf: 'flex-start',
    width: '2px',
    paddingTop: '20px',
    '& span': {
      minHeight: '32px',
      backgroundColor: 'rgba(141, 150, 160, 0.5)',
    },
  },
}));

export default useStyles;
