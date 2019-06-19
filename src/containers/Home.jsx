import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import video from '../assets/main-search-video.mp4';
import background from '../assets/main-search-video-poster.jpg';
import SearchForm from '../forms/Public/SearchForm';
import Footer from '../components/Footer/Footer';

class HomeContainer extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  onSubmit = (data) => {
    if (!data.location) {
      data.location = 'Nigeria';
    }
    const { history } = this.props;
    history.push(`/search?query=${data.keywords}&location=${data.location}`);
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Home - Worksfair</title>
        </Helmet>
        <div className="main-search-container dark-overlay">
          <div className="main-search-inner">
            <div className="container">
              <div className="columns">
                <div className="is-12">
                  <h2>Find Businesses and Services Near You.</h2>
                  <h4>Discover top-ranked businesses and services that are ready to serve your needs.</h4>

                  <SearchForm
                    onSubmit={this.onSubmit}
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="video-container">
            <video poster={background} loop autoPlay muted>
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(HomeContainer);
