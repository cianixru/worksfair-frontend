import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import avatar from '../../assets/worksfair-avatar.png';

const OwnerCard = ({ owner }) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
            Website Owner(s)
        </p>
      </header>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src={owner
                  && owner.image_url
                  ? owner.image_url
                  : avatar}
                alt="avatar"
                className="is-rounded"
              />
            </figure>
          </div>
          <div className="media-content content">
            <Link to="/">
              { owner
                && `${owner.first_name} ${owner.last_name}`
              }
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

OwnerCard.propTypes = {
  owner: PropTypes.object
};

export default OwnerCard;
