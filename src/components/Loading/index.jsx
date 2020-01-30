import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Loading.css';

const Loading = () => (
  <div className="loading__container">
    <div className="loading__center">
      <CircularProgress />
    </div>
  </div>
);

export default Loading;
