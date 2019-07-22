import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { resolve } from 'path';
import PropTypes from 'prop-types';

import avatar from '../../assets/worksfair-avatar.png';

const UserNavItem = ({ user, links }) => {
  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <div className="user-name navbar-link">
        <span>
          <img
            src={user.image_url ? user.image_url : avatar}
            alt="avatar" />
        </span>
        {`${user.first_name} ${user.last_name}`}
      </div>
      <ul className="navbar-dropdown">
        {links.map(link => (
          <li
            key={link.text}
          >
            <NavLink
              to={resolve(link.to)}
              activeClassName="active"
              className={link.class}
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

UserNavItem.propTypes = {
  user: PropTypes.object,
  links: PropTypes.array,
};

export default withRouter(UserNavItem);
