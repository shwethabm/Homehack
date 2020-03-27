import React, { Component } from 'react';
import Group from './Chat/Group';

class App extends Component {
  render() {
    return (
      <div>
        <Group />
        {this.props.children}
      </div>
    );
  }
}

export default App;