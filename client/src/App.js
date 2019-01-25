import React, { Component } from 'react';
import Navigation from './components/Nav'

class App extends Component {
  
  render() {
    return (
      <div className="App">
       <header className="App-header">
          <nav>
            <Navigation loggedIn={this.props.loggedIn} toggleLogin={this.props.toggleLogin} />
          </nav>
        </header>
      </div>
    );
  }
}

export default App;