import React from 'react';
import PropTypes from 'prop-types';

const WebpageFooter = ({ title, mainappUrl }) => (
  <footer className="columns footer has-text-centered">
    <div className="column">
      <div className="copyrights">
        <h4 className="subtitle is-5" >
          Copyright <b>{title}</b> {new Date().getFullYear()}
        </h4>
        <h6 className="subtitle is-size-7" >Powered by
          <a
            href={mainappUrl}
            className="has-text-grey" > Worksfair.com</a>
          . All Rights Reserved.
        </h6>
      </div>
    </div>
  </footer>
);

WebpageFooter.propTypes = {
  title: PropTypes.string,
  mainappUrl: PropTypes.string,
};

export default WebpageFooter;
