import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import
WebpageItem from '../components/Dashboard/SearchWebpage/SearchWebpageItem';
import
NoSearchResults from '../components/Dashboard/SearchWebpage/NoSearchResult';
import { search } from '../actions/public';
import SearchForm from '../forms/Public/SearchForm';
import { isLoading, isComplete } from '../actions/loader';

class SearchResultContainer extends Component {
  static propTypes = {
    webpages: PropTypes.array,
    location: PropTypes.object,
    actions: PropTypes.object,
    history: PropTypes.object,
    search: PropTypes.func,
  }

  async componentDidMount() {
    const { location, actions } = this.props;
    try {
      actions.isLoading();
      const params = new URLSearchParams(location.search);
      const data = {
        keywords: params.get('query'),
        location: params.get('location'),
      };
      await actions.search(data);
    } catch (error) {
      console.log(error);
    } finally {
      actions.isComplete();
    }
  }

  onSearch = async (data) => {
    if (!data.location) {
      data.location = 'Nigeria';
    }
    const { history, actions } = this.props;
    try {
      actions.isLoading();
      history.push(`/search?query=${data.keywords}&location=${data.location}`);
      await actions.search(data);
    } catch (error) {
      console.log(error);
    } finally {
      actions.isComplete();
    }
  }

  render() {
    const { webpages, location } = this.props;
    const params = new URLSearchParams(location.search);
    const data = {
      keywords: params.get('query'),
      location: params.get('location'),
    };
    const sampleImage = "https://imgplaceholder.com/180x180/131111?text=PICTURE+COMING+SOON&font-size=18"

    return (
      <section className="section">
        <Helmet>
          <title>Search - Worksfair</title>
        </Helmet>
        <div className="container margin-bottom-25">
          <div className="columns">
            <div className="column is-1" />
            <div className="column">
              <SearchForm
                onSubmit={this.onSearch}
                data={data}
              />
            </div>
            <div className="column is-1" />
          </div>
        </div>
        <div className="container">
          <div className="columns">
            <div className="column is-1" />
            <div className="column">
              <ul>
                { webpages && webpages.length > 0
                  ? webpages.map((webpage) => {
                    const dayCreated = new Date(webpage.created_at).toDateString();

                    const itemProps = {
                      dayCreated, webpage, sampleImage,
                    };
                    return (
                      <WebpageItem key={webpage.sub_domain_name} {...itemProps} />
                    );
                  })
                  : <NoSearchResults />
                }
              </ul>
            </div>
            <div className="column is-1" />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ publicData: { webpages } }) => ({
  webpages,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      search,
      isComplete,
      isLoading,
    },
    dispatch,
  ),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultContainer));
