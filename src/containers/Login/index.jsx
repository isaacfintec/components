import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Loading from '../../components/Loading';
import { fetchLogin } from '../../api/auth';
import { saveAuthUser } from '../../helpers/auth';

import './Login.css';

const Login = ({ history }) => {
  const [isLoading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(null);

  /**
   * try to login user
   */
  const fetchData = async () => {
    setLoading(true);
    const response = await fetchLogin(credentials);
    if (response) {
      const { user } = response;
      const { remember } = credentials;
      const save = saveAuthUser(user, Boolean(remember));
      if (save) {
        if (window) window.location.replace('/panel');
        else history.push('/panel');
      }

      else {
        setLoading(false);
      }
    }
    else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (credentials) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [credentials]);

  /**
   *
   * @param {Object} event
   * catch and process onSubmit
   */
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const { target } = event;
    const fields = serialize(target, { hash: true });
    setCredentials(fields);
  };

  /**
   *
   * @param {String} route
   * this function make a clousure to generate routes
   */
  const goTo = route => (event) => {
    event.preventDefault();
    history.push(`/${route}`);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="login__paper">
        <Avatar className="login__avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          className="login__main-form"
          onSubmit={handleOnSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" name="remember" />}
            label="Recordar?"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="login__main-form__submit"
          >
            Enviar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" onClick={goTo('forgot')}>
                Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" onClick={goTo('sigIn')}>
                No tienes cuenta? Registrate.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      { isLoading && <Loading /> }
    </Container>
  );
};

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
