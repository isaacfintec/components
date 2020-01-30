import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const alert = async (title = '', text = '', type = 'info') => {
  const Swal = withReactContent(SweetAlert);
  Swal.fire({
    type,
    title,
    text,
  });
};

export const toast = async (title = '', text = '', type = 'success') => {
  const Swal = withReactContent(SweetAlert);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  Toast.fire({
    type,
    title,
    text,
  });
};

export const confirm = async (title = '', text = '', confirmButtonText = 'Si', cancelButtonText = 'No', type = 'warning') => {
  const Swal = withReactContent(SweetAlert);
  return Swal.fire({
    title,
    text,
    type,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText,
    cancelButtonText,
  });
};

export default {
  alert,
  toast,
  confirm,
};
