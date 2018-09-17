import * as React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import 'bulma/css/bulma.css'

import Header from './components/Header'
import ListCustomers from './modules/customer/ListCustomers'
import ListProjects from './modules/project/ListProjects'
import CreateEntry from './modules/entry/CreateEntry'
import ListWorkers from './modules/worker/ListWorkers'
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
              <Route path="/projects" component={ListProjects} />
              <Route path="/entries" component={CreateEntry} />
              <Route path="/workers" component={ListWorkers} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
