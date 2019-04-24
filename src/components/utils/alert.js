import { toast, Slide } from 'react-toastify';

class notify {
  static success(message) {
    toast.success(message, {
      hideProgressBar: false,
      transition: Slide,
      autoClose: 4000,
      pauseOnHover: true,
      draggable: true,
    });
  }

  static error(message) {
    toast.error(message, {
      hideProgressBar: false,
      transition: Slide,
      autoClose: 4000,
      pauseOnHover: true,
      draggable: true,
    });
  }

  static info(message) {
    toast.info(message, {
      hideProgressBar: false,
      transition: Slide,
      autoClose: false,
      draggable: true,
    });
  }

  static warning(message) {
    toast.warn(message, {
      hideProgressBar: false,
      transition: Slide,
      autoClose: 4000,
      pauseOnHover: true,
      draggable: true,
    });
  }
}

export default notify;
