import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostByDateAndTitle, getPostsByCategory } from '../actions/posts';
import { getCommentsByPost, comment } from '../actions/comments';
import Post from './Post';
import Sidebar from './Sidebar';

const stateToProps = (state, ownProps) => {
  const params = ownProps.match.params;
  const { year, month, day, title } = params;

  const post = _.get(state.posts.byDate, [year, month, day, title], {});
  const category = _.get(post.data, 'category');
  const postsByCategory = _.get(state.posts.byCategory, category, []);
  const postsInCategory = _.take(_.filter(postsByCategory.data, categoryPost => categoryPost.id !== post.data.id), 5);

  const comments = _.get(state.comments, [title, 'data'], []);
  return {
    post, comments, postsInCategory, category
  };
};

const actions = {
  getPostByDateAndTitle,
  getPostsByCategory,
  getCommentsByPost,
  comment
};

class PostContainer extends React.Component {
  componentDidMount() {
    const postData = this.props.post.data;
    if (!postData) {
      this.loadPost(this.props.match.params);
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextParams = nextProps.match.params;
    const params = this.props.match.params;
    if (nextParams.title !== params.title) {
      const postData = nextProps.post.data;
      if (!postData) {
        this.loadPost(nextParams);
      }
    }
    if (nextProps.category && nextProps.category !== this.props.category) {
      this.props.getPostsByCategory(nextProps.category);
    }
  }

  loadPost(params) {
    const { year, month, day, title } = params;
    const date = { year, month, day };
    this.props.getPostByDateAndTitle(date, title);
    this.props.getCommentsByPost(title);
  }

  render() {
    return (
      <div className="post-container">
        <Sidebar category={this.props.category} posts={this.props.postsInCategory} />
        <Post post={this.props.post} comments={this.props.comments} comment={this.props.comment} />
      </div>
    );
  }
};

export default connect(stateToProps, actions)(PostContainer);
