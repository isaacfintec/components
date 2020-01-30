/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import Table from '../../components/Table';
import './Tickets.css';
import ModalNewTicket from '../../components/ModalNewTicket';
import Loading from '../../components/Loading';

import GroupsApi from '../../api/groups';
import TicketsApi from '../../api/tickets';
import { baseUrlSocket } from '../../api/config';

import { TICKET_LETTER, DATE } from '../../components/Table/TableCellTypes';

const NEW_COMMENT = 'newComment';
const headRows = [
  {
    id: 'status',
    numeric: false,
    disablePadding: true,
    label: 'ESTATUS',
    type: TICKET_LETTER,
    key: 'priority.name',
  },
  {
    id: 'uid',
    numeric: true,
    disablePadding: true,
    label: '#',
    key: 'uid',
  },
  {
    id: 'subject',
    numeric: false,
    disablePadding: true,
    label: 'Tema',
    key: 'subject',
  },
  {
    id: 'owner.fullName',
    numeric: false,
    disablePadding: true,
    label: 'Cliente',
    key: 'owner.fullName',
  },
  {
    id: 'assignee.fullName',
    numeric: false,
    disablePadding: true,
    label: 'Asignado a',
    key: 'assignee.fullName',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: true,
    label: 'Fecha límite',
    type: DATE,
    key: 'date',
  },
  {
    id: 'updatedAt',
    numeric: true,
    disablePadding: true,
    label: 'Actualizado en',
    type: DATE,
    key: 'updatedAt',
  },
];

const Tickets = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setLoad] = useState(false);

  const fetchGroups = async () => {
    const foundGroups = await GroupsApi.index();
    if (foundGroups) {
      setGroups(foundGroups);
    }
  };

  const fetchTickets = async () => {
    const foundData = await TicketsApi.index();
    if (foundData) {
      const { tickets: foundTickets, priorities: foundPriorities } = foundData;
      setTickets(foundTickets);
      setPriorities(foundPriorities);
      return foundData;
    }
  };

  const formatPriorities = async (foundTickets) => {
    if (foundTickets.length > 0 && foundTickets[0].type) {
      const { 0: { type: { priorities: foundPriorities } } } = foundTickets;
      setPriorities(foundPriorities);
    }
  };

  const fetchData = async () => {
    setLoad(true);
    await fetchGroups();
    const foundTickets = await fetchTickets();
    await formatPriorities(foundTickets);
    setLoad(false);
  };

  const connectSocket = () => {
    const commentRoom = socketIOClient.connect(baseUrlSocket);
    commentRoom.on(NEW_COMMENT, () => {
      fetchData();
    });
  };

  useEffect(() => {
    fetchData();
    connectSocket();
  }, []);

  const onAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateTicket = values => async () => {
    setOpen(false);
    setLoad(true);
    const createdTicket = await TicketsApi.store(values);
    if (createdTicket) {
      await fetchData();
    }
    setLoad(false);
  };

  const onRowClick = (event, id) => {
    history.push(`/tickets/${id}`);
  };

  return (
    <Fragment>
      <ModalNewTicket
        open={open}
        handleClose={handleClose}
        handleCreateTicket={handleCreateTicket}
        groups={groups}
        priorities={priorities}
      />
      <Table
        title="Tickets"
        data={tickets}
        headers={headRows}
        checkRow
        onAdd={onAdd}
        onRowClick={onRowClick}
        titleAdd="Agregar nuevo ticket"
      />
      { isLoading && <Loading /> }
    </Fragment>
  );
};

Tickets.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Tickets;
