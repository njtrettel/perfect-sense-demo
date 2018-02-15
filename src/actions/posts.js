import axios from 'axios';
import _ from 'lodash';

export const GET_POST = 'GET_POST';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAIL = 'GET_POST_FAIL';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';
export const GET_POSTS_BY_CATEGORY_SUCCESS = 'GET_POSTS_BY_CATEGORY_SUCCESS';
export const GET_POSTS_BY_CATEGORY_FAIL = 'GET_POSTS_BY_CATEGORY_FAIL';

const getPostAction = (title, date) => {
  return {
    type: GET_POST,
    title,
    date
  };
};

const getPostSuccessAction = (post, date) => {
  return {
    type: GET_POST_SUCCESS,
    post,
    date
  };
};

const getPostFailAction = (error, title, date) => {
  return {
    type: GET_POST_FAIL,
    error,
    title,
    date
  };
};

const getPostsByCategoryAction = (category) => {
  return {
    type: GET_POSTS_BY_CATEGORY,
    category
  };
};

const getPostsByCategorySuccessAction = (category, posts) => {
  return {
    type: GET_POSTS_BY_CATEGORY_SUCCESS,
    category,
    posts
  };
};

const getPostsByCategoryFailAction = (category, error) => {
  return {
    type: GET_POSTS_BY_CATEGORY_FAIL,
    category,
    error
  };
};

export const getPostByDateAndTitle = (date, title) => (dispatch, getState) => {
  const dateString = `${date.year}-${date.month}-${date.day}`;
  dispatch(getPostAction(title, date));
  return axios.get(`/api/post/${dateString}/${title}`)
    .then(
      ({ data }) => dispatch(getPostSuccessAction(data, date)),
      ({ response }) => dispatch(getPostFailAction(response.data, title, date))
    );
};

export const getPostsByCategory = (category) => (dispatch, getState) => {
  dispatch(getPostsByCategoryAction(category));
  return axios.get(`/api/posts/${category}`)
    .then(
      ({ data }) => dispatch(getPostsByCategorySuccessAction(category, data.posts)),
      ({ response }) => dispatch(getPostsByCategoryFailAction(category, response,data))
    );
};
