class Auth {
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
  }

  setLocalStorage(authResult) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('username', authResult.username);
    localStorage.setItem('user_id', authResult.id);
    localStorage.setItem('email', authResult.email);
  }
}

export default Auth;
