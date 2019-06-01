import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OwnerCard from '../components/Webpage/OwnerCard';
import TitleBar from '../components/Webpage/TitleBar';
import ImagesSlide from '../components/Webpage/ImagesSlide';
import OfferingItem from '../components/Webpage/OfferingItem';
import WebpageFooter from '../components/Webpage/Footer';
import getBackgroundImage from '../assets/background/backgroundImages';

class WebpageContainer extends Component {
  async componentDidMount() {
    try {
      const { match, getWebpage } = this.props;
      await getWebpage(match.params.subDomainName);
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

  render() {
    const { webpage } = this.props;
    return (
      webpage
      && <div>
        <div
          className={`hero is-large ${webpage.colour}`}>
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
        <div
          className="offering-sections"
          style={{
            backgroundImage: `url(${
              webpage && getBackgroundImage(webpage.colour)
            })`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className="section-content box has-background-white-ter">
            <h3 className="title is-4 titles has-text-grey">Our Services/Products</h3>
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
        <WebpageFooter title={webpage.title} />
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
