import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import useStyles from './style';

const HeaderCard = ({ title, subheader, children }) => {
  const clasess = useStyles();
  return (
    <Card className={clasess.card}>
      {title && <CardHeader className={clasess.cardHeader} title={title} subheader={subheader} />}
      {children}
    </Card>
  );
};

HeaderCard.propTypes = {
  title: PropTypes.string,
  subHeader: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};

HeaderCard.defaultProps = {
  title: '',
  subHeader: '',
  children: ''
};

export default HeaderCard;
