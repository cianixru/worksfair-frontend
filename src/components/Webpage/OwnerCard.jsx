import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import avatar from '../../assets/worksfair-avatar1.png';

const OwnerCard = ({ owner, colour }) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          About the Creator
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
            <Link to={`/profile/${owner.username}`}>
              { owner
                && `${owner.first_name} ${owner.last_name} `
              }
            </Link>
          <p className="is-size-7">@{owner.username}</p>
          </div>
        </div>
        <div className="message is-info">
          <p className="message-body">{owner.headline}</p>
        </div>
      </div>
    </div>
  );
};

OwnerCard.propTypes = {
  owner: PropTypes.object,
  colour: PropTypes.string,
};

export default OwnerCard;
