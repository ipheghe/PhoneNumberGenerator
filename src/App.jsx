import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      welcomeText: 'Welcome',
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.welcomeText}</h1>
      </div>
    );
  }
}
