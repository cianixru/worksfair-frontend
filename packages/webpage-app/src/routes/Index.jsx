import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

import Webpage from '../containers/Webpage';
import WebpageNav from '../components/Navbar/WebpageNav';
import publicRoutes from './Public';

class Routes extends Component {
  render() {
    const {
      isLoading,
      webpage,
    } = this.props;

    const routes = [
      ...publicRoutes
    ];
    return (
      <Fragment>
        <div className={isLoading ? 'spin-loader' : ''}>
          { isLoading
            && <Spinner
              className="spinner"
              name="three-bounce"
              color="red"
            />
          }
        </div>
        <header>
          <WebpageNav
            webpage={webpage && webpage} />
        </header>
        <Switch>
          <Route exact path="/"
            // eslint-disable-next-line react/jsx-no-bind
            render={(props) => {
              return (<Webpage {...props} />);
            }}
          />
          {
            routes.map((route, key) => (
              <Route key={route.path+key} {...route} />
            ))
          }
        </Switch>
      </Fragment>
    );
  }
}

Routes.propTypes = {
  isLoading: PropTypes.bool,
  webpage: PropTypes.object,
};


const mapStateToProps = ({ loader, webpage, }) => ({
  isLoading: loader.isLoading,
  webpage: webpage.webpage,
});

export default withRouter(connect(
  mapStateToProps,
  null,
)(Routes));
