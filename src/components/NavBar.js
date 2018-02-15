import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import { withRouter, Link } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <div className="nav-bar">
      {_.map(props.categories, (category, i) => {
        const isActive = _.includes(props.location.pathname, category);
        const classes = classnames('nav-bar__link', {
          'nav-bar__link--active': isActive
        });
        return (
          <Link className={classes} to={`/${category}`} key={i}>{category}</Link>
        );
      })}
    </div>
  );
};

export default withRouter(NavBar);
