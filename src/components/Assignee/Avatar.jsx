import React from 'react';
import PropTypes from 'prop-types';
import Person from '@material-ui/icons/Person';
import { Avatar } from '@material-ui/core';

const AvatarComponent = (props) => {
  const { src, className } = props;
  return (
    <div>
      {(src
        && <Avatar src={src} className={className} />)
        || (
        <Avatar className={className}>
          <Person />
        </Avatar>
        )
        }
    </div>
  );
};

AvatarComponent.defaultProps = {
  src: '',
};

AvatarComponent.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string.isRequired,
};

export default AvatarComponent;
