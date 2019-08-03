import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import dotenv from 'dotenv';
import { Image, Transformation } from 'cloudinary-react';

import Footer from '../components/Footer/Footer';

dotenv.config();

class NotFound extends Component {
  render() {
    const compass = 'https://res.cloudinary.com/worksfair/image/upload/v1564834329/dev/qvwvfuxg6040ppipkanj.png';
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
                <Image
                  cloudName="worksfair"
                  publicId={compass}
                  type="fetch"
                  className="offering-image">
                  <Transformation width="700" fetchFormat="auto" />
                </Image>
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
