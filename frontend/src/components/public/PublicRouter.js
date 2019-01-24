import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';

class PublicRouter extends React.Component {
  render() {
    return (
      <div className="Public">
        <Route exact path="/" component={Home} />
      </div>
    );
  }
};

export default PublicRouter;