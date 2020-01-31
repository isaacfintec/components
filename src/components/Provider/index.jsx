import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ProviderContainer from './ProviderContainer';
import allReducers from './reducers';

const store = createStore(allReducers);

const ProviderApp = ({ history, children }) => {
  console.log(history);
  return (
    <Provider store={store} >
      <ProviderContainer history={history}>
        { children }
      </ProviderContainer>
    </Provider>
  );
};

ProviderApp.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default ProviderApp;
