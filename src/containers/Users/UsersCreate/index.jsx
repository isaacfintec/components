import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import FullDialog from '../../../components/FullDialog';

import UsersApi from '../../../api/users';
import { toast } from '../../../helpers/sweetAlert';

import './UsersCreate.css';

const UsersCreate = ({ history }) => {
  const formElement = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const onClose = () => {
    history.push('/users');
  };

  const forceSubmit = async () => {
    const form = formElement.current;
    const validity = form.checkValidity();

    if (validity) {
      setLoading(true);
      const fields = serialize(form, { hash: true });
      // eslint-disable-next-line
      const newUser = await UsersApi.store(fields);
      if (newUser) {
        toast('Guardado Exitoso');
        onClose();
      }
      setLoading(false);
    }

    else {
      form.reportValidity();
    }
  };

  return (
    <FullDialog
      isOpen
      onClose={onClose}
      title="Crear Usuario"
      onSave={forceSubmit}
      isLoading={isLoading}
    >
      <Paper className="users-create__paper ">
        <form
          ref={formElement}
          className="users-create__form"
        >
          <TextField
            id="username"
            name="username"
            label="Nombre de Usuario"
            margin="normal"
            required
          />
          <TextField
            id="firstName"
            name="firstName"
            label="Nombre"
            margin="normal"
            required
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Apellidos"
            margin="normal"
            required
          />
          <TextField
            id="email"
            name="email"
            type="email"
            label="Correo"
            margin="normal"
            required
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Contraseña"
            margin="normal"
            required
          />
        </form>
      </Paper>
    </FullDialog>
  );
};

UsersCreate.propTypes = {
  history: PropTypes.object.isRequired,
};

export default UsersCreate;
