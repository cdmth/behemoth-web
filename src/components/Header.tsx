import * as React from 'react'
import { Link } from "react-router-dom";

const createCustomer = () => {
  return (
    <header className="App-header">
      <div>
        <ul>
          <li>
            <Link to="/">Customers</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default createCustomer