import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './components/Container';

const App = (props) => {
  return (
    <Router>
      <Container />
    </Router>
  );
};

export default App;
