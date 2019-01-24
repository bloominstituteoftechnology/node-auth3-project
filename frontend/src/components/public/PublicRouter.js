import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';

class PublicRouter extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/" component={Home} />
      </>
    );
  }
};

export default PublicRouter;