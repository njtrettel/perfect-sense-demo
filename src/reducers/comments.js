import _ from 'lodash';
import {
  GET_COMMENTS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  COMMENT,
  COMMENT_SUCCESS,
  COMMENT_FAIL
} from '../actions/comments.js';

const comments = (state = {}, action) => {
  switch (action.type) {
    case GET_COMMENTS:
    case COMMENT:
      return _.merge({}, state, {
        [action.title]: { loading: true, error: null, data: [] }
      });
    case GET_COMMENTS_SUCCESS:
    case COMMENT_SUCCESS:
      return _.merge({}, state, {
        [action.title]: { loading: false, error: null, data: action.comments }
      });
    case GET_COMMENTS_FAIL:
    case COMMENT_FAIL:
      return _.merge({}, state, {
        [action.title]: { loading: false, error: action.error, data: [] }
      });
    default:
      return state;
  }
};

export default comments;
