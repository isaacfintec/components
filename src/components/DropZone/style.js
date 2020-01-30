import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  dropZoneContainer: {
    boxSizing: 'border-box',
    widows: '100%',
    padding: theme.spacing(2),
    backgroundColor: '#fbfbfb',
    borderRadius: '4px',
    border: '1px solid #fbfbfb',
  },
  dropZone:{
    boxSizing: 'border-box',
    width: '100%',
    height: '204.33px',
    border: '2px dashed #4C5C68',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    boxShadow: 'none',
    backgroundColor: '#fbfbfb',
  },
  typography: {
    textAlign: 'center',
  }
}));
