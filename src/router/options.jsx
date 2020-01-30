import React from 'react';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import Folder from '@material-ui/icons/Folder';
import { havePermission } from '../helpers/auth';

export default {
  tickets: [
    {
      name: 'Tickets',
      icon: <AssignmentIcon />,
      url: '/tickets',
    },
    {
      name: 'Grupos',
      icon: <GroupIcon />,
      url: '/tickets/groups',
    },
  ],

  users: [
    {
      name: 'Home',
      icon: <HomeIcon />,
      url: '/',
    },
  ],

  payrolls: [
    {
      name: 'Home',
      icon: <HomeIcon />,
      url: '/',
    },
  ],

  liquids: [
    {
      name: 'Home',
      icon: <HomeIcon />,
      url: '/',
    },
    havePermission('liquids', 'search') && {
      name: 'Apartar Líquido',
      icon: <SupervisedUserCircle />,
      url: '/liquids',
    },
    havePermission('liquids', 'confirm') && {
      name: 'Confirmar Líquido',
      icon: <AssignmentTurnedIn />,
      url: '/liquids/reserv',
    },
  ],

  documents: [
    {
      name: 'Home',
      icon: <HomeIcon />,
      url: '/',
    },
    {
      name: 'Documentos',
      icon: <Folder />,
      url: '/documents',
    },
  ],

  credits: [
    {
      name: 'Home',
      icon: <HomeIcon />,
      url: '/',
    },
    havePermission('credits') && {
      name: 'Creditos',
      icon: <SupervisedUserCircle />,
      url: '/credits',
    },
  ],
};
