import React from 'react';
import _ from 'lodash';
import { Segment } from 'semantic-ui-react';
import Comments from './Comments';

const comment = (e, action, title) => {
  e.preventDefault();
  action(title, e.target.comment.value);
  const form = document.getElementById('comment-form');
  form.reset();
};

const Post = (props) => {
  const { loading, error, data } = _.get(props, 'post', {});
  if (loading || !data) {
    return <div className="post--loading">Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const { id, title, content, image, imageSource, author, date } = data;
  const prettyDate = date && `${date.month}/${date.day}/${date.year}`;
  const comments = props.comments;
  return (
    <div className="post">
      <div className="post__title">{title}</div>

      <hr />
      <div>
        <span className="post__meta post__meta--author">{author}</span>
        <span className="post__meta post__meta--date">{prettyDate}</span>
      </div>

      <div className="post__image">
        <img src={`/${image}`} />
        <div className="post__image--source">From {imageSource}</div>
      </div>
      <div className="post__content">
        {_.map(_.split(content, '\n'), (split, i) => (
          <p key={i}>{split}</p>
        ))}
      </div>

      <hr />
      <Comments comments={comments} comment={_.partialRight(comment, props.comment, id)} />
    </div>
  );
};

export default Post;
