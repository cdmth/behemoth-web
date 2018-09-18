import * as React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import 'bulma/css/bulma.css'
import './theme.css'
import './index.css';

import Header from './components/Header'
import Customers from './modules/customer/Customers'
import Projects from './modules/project/Projects'
import CreateEntry from './modules/entry/CreateEntry'
import Workers from './modules/worker/Workers'
import LeftBar from './components/LeftBar'
import WrapComponent from './components/containers/WrapComponent';

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
              <Route exact={true} path="/" component={Customers} />
              <Route path="/projects" component={Projects} />
              <Route path="/entries" component={CreateEntry} />
              <Route path="/workers" component={Workers} />
              <Route path="/new" component={WrapComponent} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
