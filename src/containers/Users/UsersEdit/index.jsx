import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import Loading from '../../../components/Loading';
import UsersApi from '../../../api/users';
import { toast } from '../../../helpers/sweetAlert';

import './UsersEdit.css';

const UsersEdit = ({ history, match }) => {
  const { id } = match.params;
  const formElement = useRef(null);
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [modulePermissions, setModulePermissions] = useState({});

  /**
   * fetch all necessary data
   */
  const fetchData = async () => {
    setLoading(true);
    // eslint-disable-next-line
    const foundUser = await UsersApi.show(id);
    if (foundUser) {
      setUser(foundUser);
    }
    setLoading(false);
  };

  /**
   * toggle if user is editable or not
   */
  const toggleEdit = () => {
    setEdit(!isEdit);
  };

  /**
   *
   * @param {String} key
   * @returns {Function}
   * edit a user parameter by key
   */
  const editUserProp = key => (event) => {
    const { value, checked } = event.target;
    const editUser = { ...user };
    editUser[key] = value || checked;
    setUser(editUser);
  };

  /**
   * go to users
   */
  const onClose = () => {
    history.push('/users');
  };

  /**
   * update the edited user
   */
  const onSave = async () => {
    const form = formElement.current;
    const validity = form.checkValidity();

    if (validity) {
      setLoading(true);
      // eslint-disable-next-line
      const newUser = await UsersApi.update(id, user);
      if (newUser) {
        toast('Editado Exitoso');
        onClose();
      }
      setLoading(false);
    }

    else {
      form.reportValidity();
    }
  };

  /**
   *
   * @param {String} module
   * @returns {Function}
   * toggle the module permission
   */
  const toggleModulePermission = module => (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isEdit) {
      const newModulePermissions = { ...modulePermissions };
      newModulePermissions[module] = !newModulePermissions[module];
      setModulePermissions(newModulePermissions);
    }
  };

  /**
   *
   * @param {Number} module
   * @param {String} permission
   * @returns {Function}
   * toggle user permission permission
   */
  const changePermissions = (module, permission) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    const newUser = { ...user };
    const modules = newUser.permissions;
    const { permissions } = modules[module];
    permissions[permission] = !permissions[permission];
    setUser(newUser);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line
  }, []);

  const modules = user.permissions || [];

  return (
    <form ref={formElement}>
      <Container
        className="users-edit__container"
        maxWidth="md"
      >
        <Paper className="paper position-relative">
          <Avatar
            alt={user.fullName}
            src={user.imageUrl}
            className="users-edit__avatar"
          />
          <div className="users-edit__container-form">
            <TextField
              id="username"
              label="Nombre Usuario"
              name="username"
              value={user.username || ''}
              onChange={editUserProp('username')}
              disabled={!isEdit}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="firstName"
              label="Nombre"
              name="firstName"
              value={user.firstName || ''}
              onChange={editUserProp('firstName')}
              disabled={!isEdit}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="lastName"
              label="Apellidos"
              name="lastName"
              value={user.lastName || ''}
              onChange={editUserProp('lastName')}
              disabled={!isEdit}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="email"
              label="Correo"
              name="email"
              type="email"
              value={user.email || ''}
              onChange={editUserProp('email')}
              disabled={!isEdit}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean(user.status)}
                    onChange={editUserProp('status')}
                    color="primary"
                    disabled={!isEdit}
                  />
                }
                label="Estado"
              />
            </FormGroup>
            <div className="users-edit__container-form-actions">
              {
                isEdit
                  ? (
                    <>
                      <IconButton
                        className="bg-success color-white"
                        onClick={onSave}
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton
                        className="bg-danger color-white"
                        onClick={toggleEdit}
                      >
                        <CancelIcon />
                      </IconButton>
                    </>
                  )
                  : (
                    <IconButton
                      className="bg-warning color-white"
                      onClick={toggleEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  )
              }
            </div>
          </div>
        </Paper>
      </Container>
      <Paper className="paper">
        <Grid container spacing={5}>
          {
            modules.map((module, moduleIndex) => {
              const moduleName = module.module.name;
              const { permissions } = module;
              return (
                <Grid
                  key={module._id}
                  item
                  sm={6}
                >
                  <List>
                    <>
                      <ListItem
                        button
                        onClick={toggleModulePermission(moduleName)}
                      >
                        <ListItemText primary={moduleName} />
                        <ListItemSecondaryAction>
                          <Checkbox
                            checked={Boolean(modulePermissions[moduleName])}
                            onClick={toggleModulePermission(moduleName)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Collapse
                        in={Boolean(modulePermissions[moduleName])}
                        timeout="auto"
                        unmountOnExit
                      >
                        {
                          Object.keys(permissions).map(permission => (
                            <List
                              key={`${module._id}-${permission}`}
                              component="div"
                              disablePadding
                            >
                              <ListItem
                                button
                                onClick={changePermissions(moduleIndex, permission)}
                              >
                                <ListItemText primary={permission} />
                                <ListItemSecondaryAction>
                                  <Checkbox
                                    checked={permissions[permission]}
                                    onClick={changePermissions(moduleIndex, permission)}
                                  />
                                </ListItemSecondaryAction>
                              </ListItem>
                            </List>
                          ))
                        }
                      </Collapse>
                    </>
                  </List>
                </Grid>
              );
            })
          }
        </Grid>
      </Paper>
      { isLoading && <Loading /> }
    </form>
  );
};

UsersEdit.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default UsersEdit;
