import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  requestDevice(){
    navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
    .then(device => {
      console.log('> Name:             ' + device.name);
      console.log('> Id:               ' + device.id);
      console.log('> Allowed Services: ' + device.uuids.join('\n' + ' '.repeat(20)));
      console.log('> Connected:        ' + device.gatt.connected);
    }).then(device => { console.log(device); })
    .catch(error => { console.log(error); });
  }

  
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
      <button onClick={()=>this.requestDevice()}>requestDevice</button>
      </div>
      );
  }
}

export default App;
