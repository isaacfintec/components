import React from 'react';
import Grid from '@material-ui/core/Grid';

import MessagesLeft from './components/MessagesLeft';
import MessagesRight from './components/MessagesRight';

const currentUserId = '0da77648-76f6-4f77-ae5f-da9493ba8841';
const conversations = [
  {
    _id: 'd3e70283-1ce9-40db-8228-540524b0e7ee',
    calendarDate: 'Sun Dec 15 2019',
    updatedAt: '00:12:17',
    recentMessage: 'dynamic',
    partner: {
      _id: '4dc90476-79e3-4f44-97d1-5ee5595e2a86',
      image: '',
      fullName: 'Test Test',
    },
    messages: [
      {
        owner: {
          _id: '0da77648-76f6-4f77-ae5f-da9493ba884a',
          image: 'https://s3.amazonaws.com/uifaces/faces/twitter/gofrasdesign/128.jpg',
        },
        body: 'Investor Rustic',
      },
      {
        owner: {
          _id: '0da77648-76f6-4f77-ae5f-da9493ba8841',
          image: 'https://s3.amazonaws.com/uifaces/faces/twitter/luxe/128.jpg',
        },
        body: 'Paradigm',
      },
    ],
  },
  {
    _id: 'ccd65c0a-bdf5-4eb3-a251-f6aee1dd2fb9',
    updatedAt: '10:12:17',
    calendarDate: 'Mon May 18 2020',
    recentMessage: 'Finland secured line monitor',
    partner: {
      _id: '28315ab6-bacd-43df-a35f-cea1955951c5',
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/rpatey/128.jpg',
      fullName: 'Test1 Test1',
    },
  },
];

const { messages } = conversations[0];
const Messages = () => (
  <div>
    <Grid container spacing={5}>
      <Grid item sm={4} xs={12}>
        <MessagesLeft conversations={conversations} />
      </Grid>
      <Grid item sm={8} xs={12}>
        <MessagesRight
          currentUserId={currentUserId}
          messages={messages}
        />
      </Grid>
    </Grid>
  </div>
);

export default Messages;
