import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Footer from '../components/Footer/Footer';

class Description extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Before you continue - Worksfair</title>
        </Helmet>
        <div
          className="hero is-small has-background-light"
        >
          <div className="hero-body">
            <div className="container columns">
              <div className="column is-1"/>
              <div className="column is-10">
                <h1 className="is-size-3  margin-top-25">Before You Continue</h1>
                <div className="message">
                  <div className="message-body margin-top-25">
                    <p className="is-size-5">
                      <strong>Our Mission</strong> is to be a platform for growing businesses. We aim to help people find businesses that will solve their problems (and interact with them),
                      We aim to help businesses find and interact with other businesses,
                      to foster knowledge-sharing, connection and collaboration. 
                    </p>
                  </div>
                </div>
              </div>
              <div className="column is-1 " />
            </div>
          </div>
        </div>
        <div
          className="hero is-small has-background-white margin-top-25"
        >
          <div className="hero-body ">
            <div className="container columns">
              <div className="column is-1"/>
              <div className="column is-10">
                <h1 className="is-size-4">Worksfair Terms of Service</h1>
                <div className="message is-info">
                  <div className="message-body margin-top-25">
                    <p className="is-size-6">
                      By accessing this Website, accessible from https://worksfair.com - a service by Ideosynergy,
                      you are agreeing to be bound by these Website Terms and Conditions 
                      of Use and agree that you are responsible for the agreement with any applicable local laws.
                      If you disagree with any of these terms, you are prohibited from accessing this site.
                      The materials contained in this Website are protected by copyright and trade mark law.
                      These Terms of Service has been created with the help of the <span> </span>
                      <a href="https://www.termsofservicegenerator.net">Terms of Service Generator</a><span> </span>
                      and the <span> </span>
                       <a href="https://www.privacy-policy-template.com">Privacy Policy Template</a>. 
                    </p>
                    <p className="margin-top-25">
                      Please read <span> </span>
                      <Link to="/terms-of-service">our Terms of Service</Link> and 
                      <Link to="/privacy-policy"> our Privacy Policy</Link>.
                      
                    </p>
                    <p>
                      By clicking <i>"Continue"</i>, you agree to these terms.
                    </p>
                  </div>
                </div>
              </div>
              <div className="column is-1 " />
            </div>
          </div>
        </div>
        <div
          className="hero is-small has-background-white"
        >
          <div className="hero-body ">
            <div className="container columns">
              <div className="column is-1"/>
              <div className="column is-10">
                <p className="buttons">
                  <Link
                    to="/login"
                    className="button is-info is-medium">
                    Continue
                  </Link>
                  <Link
                    to="/"
                    className="button is-info is-medium is-outlined">
                    Go Back
                  </Link>
                </p>
              </div>
              <div className="column is-1 " />
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default Description;
