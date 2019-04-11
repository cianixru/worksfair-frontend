import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// import { ToastContainer } from 'react-toastify';
import 'font-awesome/css/font-awesome.min.css';
import store from './store';

import 'bulma/css/bulma.min.css';
import './styles/App.scss';

import Routes from './routes/Index';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Routes />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
