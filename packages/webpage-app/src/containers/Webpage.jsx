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
import DetailItems from '../components/Webpage/Details';
import WebpageFooter from '../components/Webpage/Footer';
import { colourShadesOf, augmentDetails } from '../utils/helpers';
import { getWebpage } from '../actions/webpage';
import HeroSection from '../components/Webpage/HeroSection';

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

    const details = webpage.details.slice(start, end);
    const augmentedDetails = augmentDetails(details);

    augmentedDetails.map((detail, index) => {
      detail.colour = colourArray[index];
      return detail;
    });

    return (<DetailItems details={augmentedDetails} />);
  }

  render() {
    const { webpage } = this.props;
    const { REACT_APP_URL } = process.env;
    return (
      webpage
      && <div>
        <Helmet>
          <title>{webpage.title}</title>
          <meta name="description" content={webpage.description} />
          <meta name="keywords" content={webpage.keywords} />
        </Helmet>

        <HeroSection webpage={webpage} />

        <div>
          <ImagesSlide webpage={webpage} />
        </div>
        {webpage.details
          && <div 
            className="hero is-medium has-background-white-bis margin-bottom-25"
            id="about"
          >
          <div className="hero-body webpage-sections">
            {
              this.renderDetailItems(0, 3)
            }
          </div>
        </div>
        }
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
          className="hero is-large webpage-sections">
          <div
            className="section-content box has-background-white-bis"
            id="offerings"
          >
            <h3 className="title is-4 titles has-text-grey">
              Services/Products
            </h3>
            <div className="webpage-offerings">
              {
                this.renderOfferingItems(0, 9)
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
