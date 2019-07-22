import React from 'react';
import PropTypes from 'prop-types';
import DetailContent from './DetailContent';

const DetailItem = ({
  details,
  validationErrors,
  handleErrorReset,
  onSubmit,
  colour,
  handleDelete,
}) => {
  return (
    <ul>
      {details.length > 0
        ? details.map((detail, index) => (
          <DetailContent
            key={`${detail.title}${index}`}
            detail={detail}
            validationErrors={validationErrors}
            handleErrorReset={handleErrorReset}
            onSubmit={onSubmit}
            colour={colour}
            handleDelete={handleDelete}
          />
        ))
        : <div>
          <li className="columns box">
            <div className="column is-10">
              <h4 className="title is-5">
                Our Vision
              </h4>
              <p>To deliver quality technology that will improve lives.</p>
              <span className="is-8 has-text-danger">[This is a sample]</span>
            </div>
            <div className="column is-2" />
          </li>
        </div>
      }
    </ul>
  );
};

DetailItem.propTypes = {
  details: PropTypes.array.isRequired,
  validationErrors: PropTypes.object,
  handleErrorReset: PropTypes.func,
  colour: PropTypes.string,
  onSubmit: PropTypes.func,
  handleDelete: PropTypes.func,
  webpage: PropTypes.object,
};

export default DetailItem;
