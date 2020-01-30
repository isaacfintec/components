import { combineReducers } from 'redux';
import amortizationReducer from './amortization-reducer';
import periodsReducer from './periods-reducer';
import payrollReducer from './payroll-reducer';

const allReducers = combineReducers({
  amortization: amortizationReducer,
  periods: periodsReducer,
  payroll: payrollReducer,
});

export default allReducers;
