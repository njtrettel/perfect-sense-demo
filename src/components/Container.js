import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from './Header';
import PostContainer from './PostContainer';

const Container = (props) => {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/:year/:month/:day/:title" component={PostContainer} />
        <Route path="/:category" component={() => <div>NOT IMPLEMENTED</div>} />
        <Redirect to="/2018/02/01/grayson-highlands" />
      </Switch>
    </div>
  );
};

export default Container;
