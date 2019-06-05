import React from 'react';
import PropTypes from 'prop-types';

const DetailItems = ({
  details,
}) => {
  return (
    <ul className="columns">
      { details.length > 0
        && details.map(detail => (
          <div
            key={detail.title}
            className="column is-4">
            <li>
              <div className="columns is-desktop">
                <div className="column">
                  <h4
                    className="title is-5 detail-title has-text-grey"
                  >
                    <span
                      style={{
                        maxHeight: '7px',
                        marginLeft: '30px',
                        marginRight: '10px',
                        padding: '0px 3px',
                        backgroundColor: `${
                          detail && detail.colour
                        }`,
                      }}
                    />
                    {detail.title}
                  </h4>
                  <div
                    className="detail-content has-text-grey"
                    style={{
                      borderLeft: '30px solid',
                      borderBottom: '15px solid',
                      borderColor: `${
                        detail && detail.colour
                      }`,
                    }}
                  >
                    <p>{detail.description}</p>
                  </div>
                </div>
              </div>
            </li>
          </div>
        ))
      }
    </ul>
  );
};

DetailItems.propTypes = {
  details: PropTypes.array,
};

export default DetailItems;
