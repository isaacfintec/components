import React from 'react';
import { connect } from 'react-redux';
import { AMORTIZATION_TABLE, CHECKBOX_TABLE, RADIOBUTTON_TABLE } from '../Tables/tableTypes';
import NewCredit from '../../containers/NewCredit';

const ProviderContainer = (props) => {
  const {
    history,
    amortization,
    periods,
    payroll,
    children,
  } = props;
  // const _type = AMORTIZATION_TABLE;

  // const dataProvider = (_type) => {
  //   switch (_type) {
  //   case AMORTIZATION_TABLE:
  //     return amortization;
  //   case CHECKBOX_TABLE:
  //     return payroll;
  //   case RADIOBUTTON_TABLE:
  //     return periods;
  //   default:
  //     const emptyArray = [];
  //     return emptyArray;
  //   }
  // };
  // const data = dataProvider(_type);
  const type = 'simulation';

  const RenderConmponent = (values) => (
    <div>
      { React.cloneElement(children, values) }
    </div>
  );
  return (
    <RenderConmponent
      type={type}
      history={history}
      amortization={amortization}
      periods={periods}
      payroll={payroll}/>
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
