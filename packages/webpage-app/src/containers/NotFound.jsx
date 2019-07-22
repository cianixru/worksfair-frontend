import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import dotenv from 'dotenv';

import Footer from '../components/Footer/Footer';
import compass from '../assets/404-compass.png';

dotenv.config();

class NotFound extends Component {
  render() {
    console.log(process.env.REACT_APP_SERVER_URL, 'here');
    return (
      <Fragment>
        <Helmet>
          <title>Not Found - Worksfair</title>
        </Helmet>
        <div
          className="hero is-large has-background-light"
        >
          <div className="hero-body">
            <div className="container columns">
              <div className="column is-1"/>
              <div className="column is-7">
                <h1 className="has-text-extra-large">404</h1>
                <p className="has-text-large">We are sorry about this.</p>
                <p className="is-size-5">
                    The page you are looking for is not here.
                </p>
                <p className="margin-top-25">
                  <a
                    href={process.env.REACT_APP_URL}
                    className="button is-info is-medium">
                    Go To Worksfair
                  </a>
                </p>
              </div>
              <div className="column is-3 has-text-extra-large">
                <img src={compass} alt="404-compass" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

NotFound.propTypes = {
  location: PropTypes.object,
};

export default NotFound;
