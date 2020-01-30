import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import './HelpmeHeader.css';

const HelpmeHeader = () => (
  <Paper className="helpme-header__head-container no-radius">
    <img
      className="full"
      alt="¿Problemas?"
      src="https://www.corporateresolutions.com/wp-content/uploads/2018/03/get-started.png"
    />
    <div className="helpme-header__head-container-box">
      <div>
        <Typography component="h1" variant="h4">
          ¿Problemas?
        </Typography>
        <Typography component="h1" variant="h4" className="font-lighter ">
          Estamos aquí para ayudarte
        </Typography>
      </div>
      <div>
        <div className="position-relative">
          <InputBase
            className="helpme-header__search-input"
            type="text"
            placeholder="Buscar..."
          />
          <div className="helpme-header__search-input-icon-container">
            <SearchIcon />
          </div>
        </div>
      </div>
    </div>
  </Paper>
);

export default HelpmeHeader;
