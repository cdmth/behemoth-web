import * as React from 'react';
import './App.css';

import CreateCustomer from './modules/customer/CreateCustomer'
import Customer from './modules/customer/ListCustomers';
import logo from './logo.svg';

class App extends React.Component {

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Customer />
        <CreateCustomer />
      </div>
    );
  }
}

export default App;
