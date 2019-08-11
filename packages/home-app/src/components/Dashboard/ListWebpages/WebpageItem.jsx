import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';

import { textColourHelper } from '../../../utils/helpers';

const WebpageItem = ({
  nextUpdate, dayCreated, username, webpage, sampleImage
}) => (
  <li>
    <div className="columns box">
      <div className="column is-3">
        <figure className="image is-180x180">
          <Image
            cloudName="worksfair"
            publicId={(webpage.featured_images && webpage.featured_images[0]) || sampleImage}
            type="fetch"
            className="offering-image">
            <Transformation width="180" fetchFormat="auto" />
          </Image>
        </figure>
      </div>
      <div className="column is-7">
        <div className="content">
          <h3>
            <a
              href={`http://${webpage.sub_domain_name}.worksfair.com`}
              className={textColourHelper(webpage.colour)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {webpage.title}
            </a>
          </h3>
          { webpage.address && <span>
              {`${webpage.address}, ${webpage.city}, ${webpage.state}`}
            </span>
          }
        </div>
        <div>
          <h6 className="is-size-7">
            <strong>Day Created:</strong>
            <span className="has-text-black"> {dayCreated}</span>
          </h6>
          <h6 className="is-size-7">
            <strong>Due For Update:</strong>
            <span className="has-text-warning"> {nextUpdate}</span>
          </h6>
        </div>
      </div>
      <div className="column is-2 is-mobile">
        <Link
          to={`/dashboard/${username}/business/edit/${webpage.sub_domain_name}`}
          className="button is-white">
          <i className="fa fa-edit is-size-5 has-text-grey"/>
        </Link>
      </div>
    </div>
  </li>
);

WebpageItem.propTypes = {
  webpage: PropTypes.object,
  nextUpdate: PropTypes.string,
  dayCreated: PropTypes.string,
  sampleImage: PropTypes.string,
  username: PropTypes.string,
};

export default WebpageItem;
