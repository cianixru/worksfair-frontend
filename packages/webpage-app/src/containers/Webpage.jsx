import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import dotenv from 'dotenv';

import OwnerCard from '../components/Webpage/OwnerCard';
import TitleBar from '../components/Webpage/TitleBar';
import ImagesSlide from '../components/Webpage/ImagesSlide';
import OfferingItem from '../components/Webpage/OfferingItem';
import DetailItem from '../components/Webpage/Details';
import WebpageFooter from '../components/Webpage/Footer';
import getBackgroundImage from '../assets/background/backgroundImages';
import { colourShadesOf } from '../utils/helpers';
import { getWebpage } from '../actions/webpage';

dotenv.config();

class WebpageContainer extends Component {
  state = {
    colourArray: [],
  }

  async componentDidMount() {
    try {
      const { actions } = this.props;
      const url = window.location.host;
      const subDomainName = url.split('.')[0];
      await actions.getWebpage(subDomainName);
    } catch (error) {
      console.log(error);
    }
  }

  renderOfferingItems = (start, end) => {
    const { webpage } = this.props;
    const offerings = webpage.offerings.slice(start, end);

    return (<OfferingItem
      colour={webpage.colour}
      offerings={offerings}
    />);
  }

  renderDetailItems = (start, end) => {
    const { webpage } = this.props;
    const colourArray = colourShadesOf(webpage.colour).slice(start, end);

    webpage.details.map((detail, index) => {
      detail.colour = colourArray[index];
      return detail;
    });
    const details = webpage.details.slice(start, end);

    return (<DetailItem details={details} />);
  }

  render() {
    const { webpage } = this.props;
    const { REACT_APP_URL } = process.env;
    const colour = colourShadesOf(webpage && webpage.colour)[4];
    return (
      webpage
      && <div>
        <Helmet>
          <title>{webpage.title}</title>
          <meta name="description" content={webpage.description} />
          <meta name="keywords" content={webpage.keywords} />
        </Helmet>
        <div
          className={`hero is-large ${webpage.colour}`}
          id="home"
        >
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1">
                { `Welcome to ${webpage.title}` }
              </h1>
              <h2 className="subtitle is-3">
                {webpage.description }
              </h2>
            </div>
          </div>
        </div>
        <div className="webpage-hero">
          <ImagesSlide webpage={webpage} colour={colour} />
        </div>
        <div className="hero is-medium" id="about">
          <div className="hero-body webpage-sections">
            {
              this.renderDetailItems(0, 3)
            }
            {/* {
              this.renderDetailItems(3, 5)
            } */}
          </div>
        </div>
        <div className="container" id="contact">
          <div className="columns is-desktop">
            <div className="column is-three-quarters">
              <TitleBar webpage={webpage} />
            </div>
            <div className="column is-one-quarter">
              <OwnerCard
                owner={webpage && webpage.owner}
                colour={webpage && webpage.colour}
                mainappUrl={REACT_APP_URL} 
                />
            </div>
          </div>
        </div>
        <div
          className="webpage-sections"
          style={{
            backgroundImage: `url(${
              webpage && getBackgroundImage(webpage.colour)
            })`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div
            className="section-content box has-background-white-ter"
            id="offerings"
          >
            <h3 className="title is-4 titles has-text-grey">
              Our Services/Products
            </h3>
            <div className="webpage-offerings">
              {
                this.renderOfferingItems(0, 2)
              }
              {
                this.renderOfferingItems(2, 4)
              }
              {
                this.renderOfferingItems(4, 6)
              }
            </div>
          </div>
        </div>
        <WebpageFooter title={webpage.title} mainappUrl={REACT_APP_URL} />
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getWebpage,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WebpageContainer);
