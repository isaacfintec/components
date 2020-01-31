import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Tables from '../Tables';
import { AMORTIZATION_TABLE } from '../Tables/tableTypes';
import clsx from 'clsx';

const FullTable = () => {

  const getDataFromLocalStorage = () => {
    return JSON.parse(window.localStorage.getItem('mytable'));
  };

  return (
    <div>
      <Container>
        <Tables
          type={AMORTIZATION_TABLE}
          data={getDataFromLocalStorage() || [] }
          maxWidth='100%'
          maxHeight='auto'
        />
      </Container>
    </div>
  );
};

export default FullTable;
