import React from 'react';
import PropTypes from 'prop-types';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#597b9d',
      main: '#3A5066',
      dark: '#2b3c4c',
      contrastText: '#fff',
      disabled: '#aaa',
    },
    secondary: red,
    text: {
      primary: '#2c3e50',
      secondary: '#3c4146',
      hint: '#2c3e50',
    },
  },
  typography: {
    fontFamily: [
      'Raleway',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 400,
      letterSpacing: '0.094em',
      color: '#2c3e50',
    },
    h2: {
      fontWeight: 600,
      fontSize: '3.788rem',
      letterSpacing: '0.031em',
      color: '#2c3e50',
    },
    h3: {
      fontWeight: 600,
      fontSize: '3.031rem',
      letterSpacing: '0.031em',
      color: '#2c3e50',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2.144rem',
      letterSpacing: '0.016em',
      color: '#2c3e50',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.519rem',
      letterSpacing: '0.016em',
      color: '#2c3e50',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.262rem',
      letterSpacing: '0.016em',
      color: '#2c3e50',
    },
    body1: {
      fontWeight: 500,
      fontSize: '1.012rem',
      letterSpacing: '0.031em',
      color: '#3c4146',
    },
    body2: {
      fontWeight: 200,
      fontSize: '0.887rem',
      letterSpacing: '0.016em',
      color: '#3c4146',
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '1.012rem',
      letterSpacing: '0.009em',
      color: '#2c3e50',
    },
    subtitle2: {
      fontWeight: 200,
      fontSize: '0.887rem',
      letterSpacing: '0.006em',
      color: '#2c3e50',
    },
    button: {
      fontWeight: 600,
      fontSize: '0.881rem',
      letterSpacing: '0.078em',
    },
    caption: {
      fontWeight: 600,
      fontSize: '0.756rem',
    },
    overline: {
      fontWeight: 600,
      fontSize: '0.756rem',
      letterSpacing: '0.125em',
      color: '#2c3e50',
    },
  },
});

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
);

Theme.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Theme;
