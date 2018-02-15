import _ from 'lodash';
import {
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  GET_POSTS_BY_CATEGORY,
  GET_POSTS_BY_CATEGORY_SUCCESS,
  GET_POSTS_BY_CATEGORY_FAIL
} from '../actions/posts.js';

const initialState = {
  byDate: {},
  byCategory: {}
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
      let { year, month, day } = action.date;
      return _.merge({}, state, {
        byDate: {
          [year]: {
            [month]: {
              [day]: {
                [action.title]: {
                  loading: true,
                  error: null,
                  data: null
                }
              }
            }
          }
        }
      });
    case GET_POST_SUCCESS:
      year = action.date.year;
      month = action.date.month;
      day = action.date.day;
      const test = _.merge({}, state, {
        byDate: {
          [year]: {
            [month]: {
              [day]: {
                [action.post.id]: {
                  loading: false,
                  error: null,
                  data: action.post
                }
              }
            }
          }
        }
      });
      return test;
    case GET_POST_FAIL:
      year = action.date.year;
      month = action.date.month;
      day = action.date.day;
      return _.merge({}, state, {
        byDate: {
          [year]: {
            [month]: {
              [day]: {
                [action.title]: {
                  loading: false,
                  error: action.error,
                  data: null
                }
              }
            }
          }
        }
      });
    case GET_POSTS_BY_CATEGORY:
      return _.merge({}, state, {
        byCategory: {
          [action.category]: { loading: true, error: null, data: state.byCategory[action.category] }
        }
      });
    case GET_POSTS_BY_CATEGORY_SUCCESS:
      return _.merge({}, state, {
        byCategory: {
          [action.category]: { loading: false, error: null, data: action.posts }
        }
      });
    case GET_POSTS_BY_CATEGORY_FAIL:
      return _.merge({}, state, {
        byCategory: {
          [action.category]: { loading: false, error: action.error, data: state.byCategory[action.category] }
        }
      });
    default:
      return state;
  }
};

export default posts;
