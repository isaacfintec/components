import React from 'react';
import PropTypes from 'prop-types';
import { havePermission } from '../../helpers/auth';

const HavePermission = ({ module, permission, children }) => (
  <>
    {
      havePermission(module, permission) && children
    }
  </>
);

HavePermission.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default HavePermission;
