import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OwnerCard from '../components/Webpage/OwnerCard';
import TitleBar from '../components/Webpage/TitleBar';
import ImagesSlide from '../components/Webpage/ImagesSlide';

class WebpageContainer extends Component {
  async componentDidMount() {
    try {
      const { match, getWebpage } = this.props;
      await getWebpage(match.params.subDomainName);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { webpage } = this.props;
    return (
      webpage
      && <div>
        <div
          className={`hero is-medium ${webpage.colour}`}>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                { `Welcome to ${webpage.title}` }
              </h1>
              <h2 className="subtitle">
                {webpage.description }
              </h2>
            </div>
          </div>
        </div>
        <div className="webpage-hero">
          <ImagesSlide webpage={webpage} />
        </div>
        <div className="container">
          <div className="columns is-desktop">
            <div className="column is-three-quarters">
              <TitleBar webpage={webpage} />
            </div>
            <div className="column is-one-quarter">
              <OwnerCard owner={webpage && webpage.owner}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WebpageContainer.propTypes = {
  getWebpage: PropTypes.func,
  webpage: PropTypes.object,
  match: PropTypes.object,
};

WebpageContainer.defaultProps = {
  webpage: {},
};

const mapStateToProps = ({ webpage, loader, }) => ({
  webpage: webpage.webpage,
  isLoading: loader.isLoading,
});

export default connect(
  mapStateToProps,
  null,
)(WebpageContainer);
