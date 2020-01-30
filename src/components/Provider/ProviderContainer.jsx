import React from 'react';
import { connect } from 'react-redux';
import Tables from '../Tables';
import { AMORTIZATION_TABLE, CHECKBOX_TABLE, RADIOBUTTON_TABLE } from '../Tables/tableTypes';
import NewCredit from '../../containers/NewCredit';

const ProviderContainer = (props) => {
  const {
    amortization,
    periods,
    payroll,
  } = props;

  const type = AMORTIZATION_TABLE;

  const dataProvider = (_type) => {
    switch (_type) {
    case AMORTIZATION_TABLE:
      return amortization;
    case CHECKBOX_TABLE:
      return payroll;
    case RADIOBUTTON_TABLE:
      return periods;
    default:
      const emptyArray = [];
      return emptyArray;
    }
  };

  const data = dataProvider(type);

  return (
    <NewCredit data={{ amortization, periods, payroll }} />
  );
};

function mapStateProps(state) {
  return {
    amortization: state.amortization,
    periods: state.periods,
    payroll: state.payroll,
  };
}

export default connect(mapStateProps)(ProviderContainer);
