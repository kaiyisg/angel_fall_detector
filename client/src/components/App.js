import React, { Component } from 'react';
import logo from '../res/logo.svg';
import '../styles/App.css';

import BluetoothHelper from '../utils/BluetoothHelper';

class App extends Component {

  bluetoothHelper = new BluetoothHelper();

  render() {
    return (
      <div className="App">
      <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
      hello
      </p>
      <button onClick={()=>this.bluetoothHelper.requestDevice()}>requestDevice</button>
      </div>
      );
  }
}

export default App;
