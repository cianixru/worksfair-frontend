import React, { Component } from 'react';

import 'bulma/css/bulma.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

library.add(faPlusCircle);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Navbar />
          
        </header>

        <Footer />
      </div>
    );
  }
}

export default App;
