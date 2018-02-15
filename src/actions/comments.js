import axios from 'axios';
import _ from 'lodash';

export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAIL = 'GET_COMMENTS_FAIL';
export const COMMENT = 'COMMENT';
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
export const COMMENT_FAIL = 'COMMENT_FAIL';


const getCommentsAction = (title) => {
  return {
    type: GET_COMMENTS,
    title
  };
};

const getCommentsSuccessAction = (title, comments) => {
  return {
    type: GET_COMMENTS_SUCCESS,
    title,
    comments
  };
};

const getCommentsFailAction = (error, title, date) => {
  return {
    type: GET_COMMENTS_FAIL,
    error,
    title,
    date
  };
};

const commentAction = (title) => {
  return {
    type: COMMENT,
    title
  };
};

const commentSuccessAction = (title, comments) => {
  return {
    type: COMMENT_SUCCESS,
    title,
    comments
  };
};

const commentFailAction = (title, error) => {
  return {
    type: COMMENT_FAIL,
    title,
    error
  };
};

export const getCommentsByPost = (title) => (dispatch, getState) => {
  dispatch(getCommentsAction(title));
  return axios.get(`/api/comments/${title}`)
    .then(
      ({ data }) => dispatch(getCommentsSuccessAction(title, data.comments)),
      ({ response }) => dispatch(getCommentsFailAction(response.data, title))
    );
};

export const comment = (title, content) => (dispatch, getState) => {
  const date = new Date();
  const comment = {
    postId: title,
    author: 'Guest',
    date: {
      year: date.getFullYear(),
      month: date.getMonth().toFixed(2),
      day: date.getDate().toFixed(2)
    },
    content
  };
  dispatch(commentAction(title));
  return axios.put(`/api/comments/${title}`, { comment })
    .then(
      ({ data }) => dispatch(commentSuccessAction(title, data.comments)),
      ({ response }) => dispatch(commentFailAction(title, response.data))
    );
};
