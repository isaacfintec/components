import { toast } from './sweetAlert';
import { removeAuthUser } from './auth';

/**
 *
 * @param {Object} error
 * show a toast with the error
 */
export const displayToastApiErrors = (error) => {
  if (!error.response && error.message) return toast(error.message, 204, 'error');
  const { response: { status, data } } = error;

  if (status >= 500) {
    toast('Error Interno', status, 'error');
  }

  else {
    const { errors, message } = data;

    if (Array.isArray(errors)) {
      errors.forEach((e) => {
        toast(e.message, status, 'error');
      });
    }

    else {
      toast(message, status, 'error');
    }

    if (status === 401) {
      removeAuthUser();
      if (window) window.location.replace('/login');
    }
  }
};

export default {
  displayToastApiErrors,
};
