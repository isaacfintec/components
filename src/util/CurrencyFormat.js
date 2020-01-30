import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const CurrencyFormat = ({ value }) => {
  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  return (
    <Fragment>
      { formatterPeso(value) }
    </Fragment>
  );
};

CurrencyFormat.propTypes = {
  value: PropTypes.object.isRequired,
};

export default CurrencyFormat;
