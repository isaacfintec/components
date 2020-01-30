import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import GroupsCreateModal from './components/GroupsModal/GroupsCreateModal';
import GroupsEditModal from './components/GroupsModal/GroupsEditModal';
import Loading from '../../components/Loading';

import GroupsApi from '../../api/groups';
import { confirm } from '../../helpers/sweetAlert';

import './Groups.css';

const Groups = ({ history, match }) => {
  const { params: { groupId } } = match;
  const [createModalIsOpen, setCreateModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [isLoading, setLoad] = useState(false);

  /**
   * fetch initial data
   */
  const fetchData = async () => {
    setLoad(true);
    // eslint-disable-next-line
    const foundGroups = await GroupsApi.index();
    if (foundGroups) {
      setGroups(foundGroups);
    }
    setLoad(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * open a create modal
   */
  const openCreateModal = () => {
    setCreateModal(true);
  };

  /**
   * close a create modal and reload data
   */
  const closeCreateModal = () => {
    fetchData();
    setCreateModal(false);
  };

  /**
   * open a modal by id
   */
  const openEditModal = id => () => {
    const { path } = match;
    const url = `${path}/${id}`;
    history.push(url);
  };

  /**
   * close a modal by id and reload data
   */
  const closeEditModal = () => {
    const { path } = match;
    const url = path.replace('/:groupId', '');
    history.push(url);
    fetchData();
  };

  /**
   *
   * @param {String} id
   * @param {Number} index
   * remove a group into the server and client
   */
  const removeGroup = (id, index) => async (event) => {
    event.stopPropagation();
    const userResponse = await confirm('¿Eliminar este grupo?');
    if (userResponse.value) {
      setLoad(true);
      // eslint-disable-next-line
      const deletedGroup = await GroupsApi.destroy(id);
      if (deletedGroup) {
        const newGroups = [...groups];
        newGroups.splice(index, 1);
        setGroups(newGroups);
      }
      setLoad(false);
    }
  };

  return (
    <Container>
      <List component="div" className="group__create">
        <ListItem
          button
          onClick={openCreateModal}
        >
          <ListItemText primary="Grupos" />
          <ListItemSecondaryAction>
            <IconButton
              onClick={openCreateModal}
            >
              <AddIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <Grid container spacing={3}>
        {
          groups.map((group, index) => (
            <Grid
              // eslint-disable-next-line
              key={group._id}
              item
              sm={4}
            >
              <Card
                className="groups__cart"
                // eslint-disable-next-line
                onClick={openEditModal(group._id,)}
              >
                <CardContent
                  className="groups__cart-body"
                >
                  <Typography>
                    { group.name }
                  </Typography>
                </CardContent>
                <CardActions
                  className="groups__cart-actions"
                >
                  <IconButton
                    aria-label="delete"
                    // eslint-disable-next-line
                    onClick={removeGroup(group._id, index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        }
      </Grid>
      <GroupsCreateModal
        title="Crear Grupo"
        isOpen={createModalIsOpen}
        onClose={closeCreateModal}
      />
      <GroupsEditModal
        groupId={groupId}
        title="Editar Grupo"
        isOpen={Boolean(groupId)}
        onClose={closeEditModal}
      />
      { isLoading && <Loading /> }
    </Container>
  );
};

Groups.propTypes = {
  // eslint-disable-next-line
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line
  match: PropTypes.object.isRequired,
};


export default Groups;
