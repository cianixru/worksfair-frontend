import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const WebpageFooter = ({ title }) => (
  <footer className="columns footer has-text-centered">
    <div className="column">
      <div className="copyrights">
        <h4 className="subtitle is-5" >
          Copyright <b>{title}</b> {new Date().getFullYear()}
        </h4>
        <h6 className="subtitle is-size-7" >Powered by
          <Link
            to="/"
            className="has-text-grey" > Worksfair.com</Link>
          . All Rights Reserved.
        </h6>
      </div>
    </div>
  </footer>
);

WebpageFooter.propTypes = {
  title: PropTypes.string,
};

export default WebpageFooter;
