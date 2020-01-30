import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import AddIcon from '@material-ui/icons/Add';
import noImage from '../../../../images/defaultProfile.jpg';

const MessagesLeft = ({ conversations }) => (
  <Paper>
    <List className="no-padding">
      <ListItem button>
        <ListItemText primary="Conversations" />
        <ListItemSecondaryAction>
          <IconButton>
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      {
        conversations.map(conversation => (
          <Fragment
            // eslint-disable-next-line
            key={conversation._id}
          >
            <ListItem button>
              <ListItemAvatar>
                <Avatar
                  alt={conversation.partner.fullName}
                  src={conversation.partner.image || noImage}
                />
              </ListItemAvatar>
              <ListItemText
                primary={conversation.partner.fullName}
                secondary={conversation.recentMessage || '...'}
              />
              <ListItemSecondaryAction>
                <small>{ conversation.calendarDate }</small>
                <small>{ conversation.updatedAt }</small>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </Fragment>
        ))
      }
    </List>
  </Paper>
);

MessagesLeft.propTypes = {
  conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MessagesLeft;
