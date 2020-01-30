import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import './NotFound.css';

const NotFound = () => (
  <>
    <CssBaseline />
    <div className="not-found">
      <Typography component="h1">
        404 :(
      </Typography>
    </div>
  </>
);

export default NotFound;
