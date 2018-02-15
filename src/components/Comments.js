import React from 'react';
import _ from 'lodash';

const Comments = (props) => {
  return (
    <div className="post__comments">
      <div className="post__comments--title">Comments</div>
      <div className="post__comments--content">
        {_.map(props.comments, (comment, i) => (
          <div className="comment" key={i}>
            <span className="comment__content">{comment.content}</span>
            <span className="comment__author"> - {comment.author}</span>
            <hr className="comment__divider"/>
          </div>
        ))}
      </div>
      <div className="post__comments--form">
        <form id="comment-form" onSubmit={props.comment}>
          <textarea className="form__comment" name="comment" placeholder="Enter your comment here" />
          <button className="form__submit" type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
