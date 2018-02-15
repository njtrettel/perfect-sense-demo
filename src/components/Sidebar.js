import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  const { category, posts } = props;
  return (
    <div className="sidebar">
      <div className="sidebar__title">More from {_.capitalize(category)}</div>
      {_.map(posts, (post, i) => {
        const { year, month, day } = post.date;
        const { id } = post;
        return (
          <div className="sidebar__post" key={i}>
            <div className="sidebar__post--title"><Link to={`/${year}/${month}/${day}/${id}`}>{post.title}</Link></div>
            <div className="sidebar__post--image">
              <img src={`/${post.image}`} />
            </div>
            <div className="sidebar__post--preview">{_.truncate(post.content, { length: 100 })}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
