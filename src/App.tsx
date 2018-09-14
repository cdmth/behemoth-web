import * as React from 'react';
import './App.css';

import ListCustomer from './modules/customer/ListCustomers';
import logo from './logo.svg';

class App extends React.Component {

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <ListCustomer />
      </div>
    );
  }
}

export default App;
