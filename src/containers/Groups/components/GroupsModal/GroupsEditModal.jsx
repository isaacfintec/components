/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import AsyncSelect from 'react-select/async';

import DeleteIcon from '@material-ui/icons/Delete';

import FullDialog from '../../../../components/FullDialog';

import UsersApi from '../../../../api/users';
import GroupsApi from '../../../../api/groups';

import { toast } from '../../../../helpers/sweetAlert';

import './GroupsModal.css';

const GroupsEditModal = ({
  groupId,
  title,
  isOpen,
  onClose,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  /**
   * fetch initial data
   */
  const fetchData = async () => {
    setLoading(true);
    // eslint-disable-next-line
    const group = await GroupsApi.show(groupId);
    if (group) {
      setName(group.name);
      setUsers(group.members);
    }
    setLoading(false);
  };

  /**
   * @param {String} inputValue
   * @returns {Array}
   * fetch users
   */
  const searchUsers = async (inputValue) => {
    // eslint-disable-next-line
    const foundUsers = await UsersApi.search(inputValue);
    if (foundUsers) {
      return foundUsers.map(user => ({ label: user.fullName, value: user._id }));
    }
    return [];
  };

  /**
   * @param {Object} user
   * add a and format selected user
   */
  const addUser = (user) => {
    const exist = users.find(_user => _user._id === user.value);
    if (!exist) {
      setUsers([...users, { _id: user.value, fullName: user.label }]);
    }
  };

  /**
   * @param {Object} user
   * remove an user
   */
  const removeUser = index => () => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  /**
   * format users and save a group
   */
  const saveData = async () => {
    setLoading(true);
    const formatUsers = users.map(user => user._id);
    const group = { name, members: formatUsers };
    // eslint-disable-next-line
    const foundUsers = await GroupsApi.update(groupId, group);
    if (foundUsers) {
      setName('');
      setUsers([]);
      onClose();
      toast('Editado Exitoso');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (groupId) {
      fetchData();
    }
  // eslint-disable-next-line
  }, [groupId]);

  return (
    <FullDialog
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onSave={saveData}
      isLoading={isLoading}
    >
      <div className="groups-modal__container">
        <TextField
          label="Nombre"
          margin="normal"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <Paper
          className="groups-modal__users-container"
        >
          <div>
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={searchUsers}
              onChange={addUser}
            />
          </div>
          <List
            className="groups-modal__container-list"
          >
            {
              users.map((user, index) => (
                // eslint-disable-next-line
                <ListItem key={user._id}>
                  <ListItemText primary={user.fullName} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={removeUser(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            }
          </List>
        </Paper>
      </div>
    </FullDialog>
  );
};

GroupsEditModal.propTypes = {
  groupId: PropTypes.string,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

GroupsEditModal.defaultProps = {
  groupId: '',
};

export default GroupsEditModal;
