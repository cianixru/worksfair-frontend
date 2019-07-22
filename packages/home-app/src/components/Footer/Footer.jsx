import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer ">
        <div className="content has-text-centered">
          Copyright {new Date().getFullYear()} Worksfair. All Rights Reserved.
        </div>
      </footer>
    );
  }
}

export default Footer;
