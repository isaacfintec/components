/* eslint-disable import/no-named-as-default-member */
/* eslint-disable consistent-return */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import LeftPanel from '../../components/LeftTicketPanel';
import CommentsPanel from '../../components/Comments';
import Loading from '../../components/Loading';
import { baseUrlSocket } from '../../api/config';

import GroupsApi from '../../api/groups';
import TicketsApi from '../../api/tickets';

const NEW_COMMENT = 'newComment';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 600,
  },
}));


const TicketDetail = ({ match: { params } }) => {
  const { ticketId } = params;
  const [ticket, setTicket] = useState({});
  const [groups, setGroups] = useState([]);
  const [isLoading, setLoad] = useState(false);
  const [comment, setComment] = useState('');

  const fetchGroups = async () => {
    const foundGroups = await GroupsApi.index();
    if (foundGroups) {
      setGroups(foundGroups);
    }
  };

  const setTicketViewed = async (ticketToUpdate) => {
    const ticketViewed = { ...ticketToUpdate, viewed: true };
    await TicketsApi.update(ticketId, ticketViewed);
  };

  const fetchTicket = async (id) => {
    const foundTicket = await TicketsApi.show(id);
    if (foundTicket) {
      setTicket(foundTicket);
      await setTicketViewed(foundTicket);
      return foundTicket;
    }
  };

  const fetchData = async () => {
    setLoad(true);
    await fetchGroups();
    await fetchTicket(ticketId);
    setLoad(false);
  };

  const connectSocket = () => {
    const commentRoom = socketIOClient.connect(baseUrlSocket);
    commentRoom.on(NEW_COMMENT, () => {
      fetchData();
    });
  };

  const updateTicket = async (uploadTicket) => {
    setLoad(true);
    const response = await TicketsApi.update(ticketId, uploadTicket);
    if (response) {
      setComment('');
      await fetchData();
    }
    setLoad(false);
  };

  const addNewComment = async (newComment) => {
    setLoad(true);
    const response = await TicketsApi.storeComment(ticketId, newComment);
    if (response) {
      setComment('');
      await fetchData();
    }
    setLoad(false);
  };

  const handleEditorChange = (text) => {
    setComment(text);
  };

  const handleSendComment = () => {
    if (comment) {
      const newComment = {
        comment,
      };
      addNewComment(newComment);
    } // TODO: Show error message when empty
  };

  useEffect(() => {
    fetchData();
    connectSocket();
  // eslint-disable-next-line
  }, [params]);

  const classes = useStyles();
  return (
    <Fragment>
      { (ticket.history && groups) && (
        <Grid container className={classes.root} spacing={1}>
          <Grid item sm={3} xs={12}>
            <LeftPanel ticket={ticket} groups={groups} />
          </Grid>
          <Grid item sm={9} xs={12}>
            <CommentsPanel
              text={comment}
              ticket={ticket}
              handleEditorChange={handleEditorChange}
              handleSendComment={handleSendComment}
            />
          </Grid>
        </Grid>
      )}
      {isLoading && <Loading /> }
    </Fragment>
  );
};

TicketDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default TicketDetail;
