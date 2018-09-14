import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import 'bulma/css/bulma.css'

import Header from './components/Header'
import ListCustomers from './modules/customer/ListCustomers';
import LeftBar from './components/LeftBar'

class App extends React.Component {

  public render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="columns">
            <div className="column is-narrow">
              <LeftBar />
            </div>
            <div className="column container-fluid">
              <Route exact={true} path="/" component={ListCustomers} />
              <Route path="/projects" component={ListCustomers} />
              <Route path="/entries" component={ListCustomers} />
              <Route path="/workers" component={ListCustomers} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
