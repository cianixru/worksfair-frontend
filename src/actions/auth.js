import api from '../utils/api';

export const AUTHENTICATED_USER = 'AUTHENTICATED_USER'
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED'
export const signup = (user) => async (dispatch) => {
  const { email } = user;
  try {
    user.email = email.toLowerCase();
    user.role = 'admin';
    const newUser = await api.post('/auth/register/', user);
    return dispatch({
      type: AUTHENTICATED_USER,
      data: newUser.data,
    });
  } catch (err) {
    return dispatch({
      type: AUTHENTICATION_FAILED,
      message: err.message,
    });
  }
};

export const signin = (user) => async (dispatch) => {
  const { email } = user;
  try {
    user.email = email.toLowerCase();

    const returningUser = await api.post('/auth/login/', { user });
    return dispatch({
      type: AUTHENTICATED_USER,
      data: returningUser.data,
    });
  } catch (err) {
    return dispatch({
      type: AUTHENTICATION_FAILED,
      message: err.message,
    });
  }
};
