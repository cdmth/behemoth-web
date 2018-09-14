import * as React from 'react'
import { Link } from "react-router-dom";

const createCustomer = () => {
  return (
    <nav className="navbar is-transparent">
      <div className="navbar-brand">
        <Link className="navbar-item" to="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
        </Link>
      </div>
    </nav>
  );
};

export default createCustomer