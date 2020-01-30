import React from 'react';
import PropTypes from 'prop-types';

const PreJSON = ({ json }) => (
  <pre>
    <code>
      { JSON.stringify(json, undefined, 2) }
    </code>
  </pre>
);

PreJSON.propTypes = {
  json: PropTypes.object.isRequired,
};

export default PreJSON;
