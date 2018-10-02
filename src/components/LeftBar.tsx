import * as React from 'react'
import { Link } from "react-router-dom"

const createCustomer = () => {
  return (
    <aside className="menu left-menu">
      <p className="menu-label">
        General
      </p>
      <ul className="menu-list">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/entries">Entries</Link></li>
        <li><Link to="/workers">Workers</Link></li>
        <li><Link to="/bills">Bills</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </aside>
  );
};

export default createCustomer