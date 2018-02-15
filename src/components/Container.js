import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import Header from './Header';
import PostContainer from './PostContainer';

const Container = (props) => {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/:year/:month/:day/:title" component={PostContainer} />
      </Switch>
    </div>
  );
};

export default Container;
