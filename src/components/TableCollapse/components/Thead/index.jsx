import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import useStyles from './style';

const Thead = ({ headers }) => {
  const classes = useStyles();
  return (
    <thead className={classes.header}>
      <tr>
        {
          headers.map(({ key, value, type = '' }, index) => (
            type !== 'children' && (
              <th
                key={`th-${key}-${value}-${index}`}
                className={classes.th}
              >
                <Typography variant="body2">
                  { value }
                </Typography>
              </th>
            )
          ))
        }
      </tr>
    </thead>
  );
};

Thead.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

Thead.defaultProps = {
  headers: [],
};

export default Thead;
