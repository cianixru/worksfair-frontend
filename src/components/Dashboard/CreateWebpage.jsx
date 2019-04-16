import React, { Component } from 'react';
import PropTypes from 'prop-types';
import avatar from '../../assets/worksfair-avatar.png';
import CreateWebpageForm from '../../forms/Webpage/CreateWebpageForm';

class CreateWebpage extends Component {
  onSubmit() {
    console.log('submitted the webpage data');
  }

  render() {
    return (
      <div className="add-webpage-section">
        <div className="add-webpage-headline">
          <h3 className="add-webpage-header">
            <i className="fa fa-globe" aria-hidden="true" />
            Basic Info
          </h3>
        </div>
        <div className="add-webpage-content">
          <h5>Website Owner</h5>
          <div className="media">
            <div className="media-left">
              <figure className="image is-32x32">
                <img
                  src={avatar}
                  alt=""
                  className=".is-rounded"
                />
              </figure>
            </div>
            <div className="media-content">
              Theo Okafor
            </div>
          </div>
          <div className="add-webpage-form">
            <CreateWebpageForm
              onSubmit={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

CreateWebpage.propTypes = {
  links: PropTypes.object,
};

export default CreateWebpage;
