import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import 'font-awesome/css/font-awesome.min.css';
import store from './store';
import 'bulma/css/bulma.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles/App.scss';
import './styles/Navbar.scss';
import './styles/Webpage.scss';

import Routes from './routes/Index';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Routes />
          </Router>
          <ToastContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
