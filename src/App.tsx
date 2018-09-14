import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import 'bulma/css/bulma.css'

import Header from './components/Header'
import ListCustomers from './modules/customer/ListCustomers';

class App extends React.Component {

  public render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Route exact={true} path="/" component={ListCustomers} />
          <Route path="/projects" component={ListCustomers} />
          <Route path="/topics" component={ListCustomers} />
        </div>
      </Router>
    );
  }
}

export default App;
