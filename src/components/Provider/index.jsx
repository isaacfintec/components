import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducers';

const store = createStore(allReducers);

const ProviderApp = ({ children }) => {
  return (
    <Provider store={store}>
      { children }
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
