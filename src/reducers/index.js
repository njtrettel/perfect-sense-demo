import { combineReducers } from 'redux';
import posts from './posts';
import comments from './comments';

const state = combineReducers({
  posts, comments
});

export default state;
