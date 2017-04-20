import React, {PropTypes} from 'react';
import {NavLink} from 'react-router-dom';

const FormNav = () => {
  return (
    <ul className="nav nav-pills card-header-pills">
      <li className="nav-item">
        <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/signup" className="nav-link" activeClassName="active">Sign Up</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/reset" className="nav-link" activeClassName="active">Reset Password</NavLink>
      </li>
    </ul>
  );
};

export default FormNav;