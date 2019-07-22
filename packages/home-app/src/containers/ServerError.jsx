import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Footer from '../components/Footer/Footer';
import compass from '../assets/404-compass.png';

class ServerError extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Server Error - Worksfair</title>
        </Helmet>
        <div
          className="hero is-large has-background-light"
        >
          <div className="hero-body">
            <div className="container columns">
              <div className="column is-1"/>
              <div className="column is-7">
                <h1 className="has-text-extra-large">500</h1>
                <p className="has-text-large">We are sorry about this.</p>
                <p className="is-size-5">
                  An error occurred on our server, please bear with us.
                </p>
                <p className="margin-top-25">
                  <Link
                    to="/"
                    className="button is-info is-medium">
                    Go Home
                  </Link>
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

ServerError.propTypes = {
  location: PropTypes.object,
};

export default ServerError;
