import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';

import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';

import useStyles from './style';
import HeaderCard from '../HeaderCard';

const INITIAL_SCALE = 1;
const MIN_SCALE = 1;
const MAX_SCALE = 2;
const SCALE = 0.1;

const INITIAL_DEG = 0;
const MAX_DEG_LEFT = -360;
const MAX_DEG_RIGHT = 360;
const DEG = 90;

const Identification = ({ title, image }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [scale, setScale] = useState(INITIAL_SCALE);
  const [deg, setDeg] = useState(INITIAL_DEG);

  const onChange = (event, value) => {
    setTab(value);
    setScale(INITIAL_SCALE);
    setDeg(INITIAL_DEG);
  };

  const increaseZoom = () => {
    if (scale < MAX_SCALE) setScale(scale + SCALE);
  };

  const decreaseZoom = () => {
    if (scale > MIN_SCALE) setScale(scale - SCALE);
  };

  const rotateLeft = () => {
    if (deg - DEG === MAX_DEG_LEFT) setDeg(0);
    else setDeg(deg - DEG);
  };

  const rotateRight = () => {
    if (deg + DEG === MAX_DEG_RIGHT) setDeg(0);
    else setDeg(deg + DEG);
  };

  return (
    <HeaderCard title={title}>
      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          alt={image.name}
          src={image.url}
          style={{
            transform: `scale(${scale}) rotate(${deg}deg)`,
          }}
        />
      </div>
      <div className={classes.footer}>
        <div className={classes.buttonBar}>
          <IconButton onClick={increaseZoom} className={classes.button} size="small">
            <AddIcon fontSize="inherit" />
          </IconButton>
          <IconButton onClick={decreaseZoom} className={classes.button} size="small">
            <RemoveIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div className={classes.buttonBar}>
          <IconButton onClick={rotateLeft} className={classes.button} size="small" size="small">
            <UndoIcon fontSize="inherit" />
          </IconButton>
          <IconButton onClick={rotateRight} className={classes.button} size="small">
            <RedoIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
    </HeaderCard>
  );
};

Identification.propTypes = {
  title: PropTypes.string,
  images: PropTypes.array
};

Identification.defaultProps = {
  title: '',
  image: {
    key: 'INE',
    name: 'Frente',
    url: 'http://www.liberaldictionary.com/wp-content/uploads/2019/02/id-9688.jpg',
  },
};

export default Identification;
