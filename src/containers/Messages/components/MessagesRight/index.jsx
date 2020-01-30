/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';

import './MessagesRight.css';
import noImage from '../../../../images/defaultProfile.jpg';

const MessagesRight = ({ currentUserId, messages }) => (
  <Paper className="messages-right__paper">
    <List>
      {
        messages.map(message => (
          <ListItem
            className={
              currentUserId === message.owner._id
                ? 'messages-right__message messages-right__message-reverse'
                : 'messages-right__message'
            }
          >
            <ListItemAvatar>
              <Avatar
                alt={message.owner._id}
                src={message.owner.image || noImage}
              />
            </ListItemAvatar>
            <ListItemText
              primary={message.body}
            />
          </ListItem>
        ))
      }
    </List>
    <Container
      className="messages-right__search-container"
    >
      <InputBase
        className="messages-right__search"
        type="text"
        placeholder="Enviar..."
      />
    </Container>
  </Paper>
);

MessagesRight.propTypes = {
  currentUserId: PropTypes.string.isRequired,
  // eslint-disable-next-line
  messages: PropTypes.array.isRequired,
};

export default MessagesRight;
