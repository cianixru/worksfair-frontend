import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CreateWebpageForm from '../../../forms/Webpage/CreateWebpageForm';
import avatar from '../../../assets/worksfair-avatar.png';
import { toSentenceCase } from '../../utils/helpers';

const BasicInfo = ({
  onSubmit, user, validationErrors, handleErrorReset, webpage,
}) => {
  return (
    <Fragment>
      <h5>Website Owner</h5>
      <div className="media">
        <div className="media-left">
          <figure className="image is-32x32">
            <img
              src={user && user.image_url ? user.image_url : avatar}
              alt="avatar"
              className="is-rounded"
            />
          </figure>
        </div>
        <div className="media-content">
          { user
              && `${toSentenceCase(user.first_name)} ${toSentenceCase(user.last_name)}`
          }
        </div>
      </div>
      {/* <div className="margin-top-20">
        <h5>Webpage Subdomain name</h5>
        <p>{webpage && webpage.sub_domain_name}</p>
      </div> */}
      <div className="add-webpage-form">
        <CreateWebpageForm
          onSubmit={onSubmit}
          validationErrors={validationErrors}
          handleErrorReset={handleErrorReset}
          webpage={webpage}
        />
      </div>
    </Fragment>
  );
};

BasicInfo.propTypes = {
  onSubmit: PropTypes.func,
  user: PropTypes.object,
  validationErrors: PropTypes.object,
  handleErrorReset: PropTypes.func,
  webpage: PropTypes.object,
};

export default BasicInfo;
