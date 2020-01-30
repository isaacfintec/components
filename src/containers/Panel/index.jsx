import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { Animated } from 'react-animated-css';

import { getModules } from '../../helpers/auth';

import './Panel.css';

// eslint-disable-next-line
const Panel = ({ history }) => {
  const modules = getModules();

  console.log(modules);

  const goTo = url => () => {
    console.log(url);
    history.push(`/${url}`);
  };

  return (
    <Container component="main">
      <div className="panel__paper">
        <Animated animationIn="zoomIn" isVisible>
          <Typography variant="h3"> Panel Menu</Typography>
        </Animated>
        <div className="panel__container">
          <Grid
            container
            justify="center"
            alignItems="center"
            spacing={5}
          >
            {
              modules.map((value, index) => (
                <Grid key={index} item md={4}>
                  <div className="panel__item-container" onClick={goTo(value)}>
                    <div className="panel__item-module panel__item-module-icon">
                      { value === 'tickets/groups' && <SupervisorAccountIcon /> }
                      { value === 'tickets' && <AssignmentIcon /> }
                      { value === 'users' && <PersonIcon /> }
                      { value === 'liquids' && <AssignmentIcon /> }
                      { value === 'payrolls' && <AssignmentIcon /> }
                      { value === 'documents' && <AssignmentIcon /> }
                      { value === 'credits' && <AssignmentIcon /> }
                    </div>
                    <div className="panel__item-module panel__item-module-text">
                      { value === 'tickets/groups' && 'Grupos' }
                      { value === 'tickets' && 'Tickets' }
                      { value === 'users' && 'Usuarios' }
                      { value === 'liquids' && 'Administrador de liquidos' }
                      { value === 'payrolls' && 'Nominas' }
                      { value === 'documents' && 'Documentos' }
                      { value === 'credits' && 'Creditos' }
                    </div>
                  </div>
                </Grid>
              ))
            }
          </Grid>
        </div>
      </div>
    </Container>
  );
};

Panel.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Panel;
