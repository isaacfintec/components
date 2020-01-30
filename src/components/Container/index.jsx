import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const SimpleContainer = (props) => {
  const { children } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        {children}
      </Container>
    </React.Fragment>
  );
};

export default SimpleContainer;
