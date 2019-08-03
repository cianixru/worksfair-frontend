import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import SocialIcon from '../../atoms/SocialIcon';
import avatar from '../../assets/worksfair-avatar1.png';
import WebpageItem from './SearchWebpage/SearchWebpageItem';


const UserProfile = ({ user }) => {
  const { webpages } = user;
  const username = localStorage.getItem('username');
  const sampleImage = "https://imgplaceholder.com/180x180/131111?text=ADD+A+PICTURE&font-size=18";

  return (
    <Fragment>
      <div className="container margin-bottom-25">
        <article className="columns">
          <figure className="column is-2">
            <p className="image is-150x150">
              <img
                src={user.image_url ? user.image_url : avatar}
                className="is-rounded"
                alt="profile"
              />
            </p>
          </figure>
          <div className="column is-10">
            <div className="content">
              <p className="is-size-4">
                <strong>{`${user.first_name} ${user.last_name} `}</strong>
                <small> @{user.username}</small>
              </p>
              <p>{user.headline}</p>
              {
                user.current_location
                && <p>
                  <i className="fa fa-map-marker"/> {user.current_location}
                </p>
              }
            </div>
          </div>
        </article>
      </div>
      <div className="container">
        <div className="columns">
          <div className="column is-4">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  Contact
                </p>
              </header>
              <div className="card-content">
                {(user.facebook || user.instagram || user.twitter)
                  ? <div className="content">
                    {
                      user.facebook
                    && <p>
                      <a href={user.facebook}>
                        <SocialIcon icon="fa fa-facebook" /> Facebook
                      </a>
                    </p>
                    }
                    {
                      user.twitter
                    && <p>
                      <a href={user.twitter}>
                        <SocialIcon icon="fa fa-twitter" /> Twitter
                      </a>
                    </p>
                    }
                    {
                      user.instagram
                    && <p>
                      <a href={user.instagram}>
                        <SocialIcon icon="fa fa-instagram" /> Instagram
                      </a>
                    </p>
                    }
                  </div>
                  : <div className="message is-warning">
                    <div className="message-body">
                      <p className="is-size-5">
                        No contact info to show
                      </p>
                      <p className="is-size-7">
                        This user has not added any contact info yet
                      </p>
                    </div>
                  </div>
                }
              </div>
              <footer className="card-footer">
                { (username === user.username)
                    && <Link
                      to={`/dashboard/${username}/profile`}
                      className="card-footer-item">
                        Update profile
                    </Link>
                }
              </footer>
            </div>
          </div>
          <div className="column is-8">
            <div>
              <h3 className="is-size-4 margin-bottom-25">
                {user.first_name}'s Business{
                  (webpages.length > 1 || webpages.length === 0) && 'es'
                }
              </h3>
              <ul>
                { webpages && webpages.length > 0
                  ? webpages.map((webpage) => {
                    const dayCreated = new Date(webpage.created_at)
                      .toDateString();

                    const itemProps = {
                      dayCreated, webpage, sampleImage,
                    };
                    return (
                      <WebpageItem
                        key={webpage.sub_domain_name} {...itemProps} />
                    );
                  })
                  : <div className="message is-warning">
                    <div className="message-body">
                      <p className="is-size-5">
                        No businesses to show
                      </p>
                      <p className="is-size-7">
                        This user has not added a business yet
                      </p>
                    </div>
                  </div>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object,
};

export default withRouter(UserProfile);
