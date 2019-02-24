import React from 'react';
import NavItem from './NavItem';

const Nav = (props) => {
  return (
    <header>
      {/* BILLHUB HEADER */}
      <a className="navbar-brand">
        <img className="appIcon" src={"/images/simpleGavel.png"}/>
        <span className="brandName">BillHub</span>
      </a>

      <nav className="nav nav-pills nav-fill">
          <NavItem updateNav={props.updateNav.bind(this)} path="tracking"/>
          <NavItem updateNav={props.updateNav.bind(this)} path="trending"/>
          <NavItem updateNav={props.updateNav.bind(this)} path="bills"/>
          <NavItem updateNav={props.updateNav.bind(this)} path="legislators"/>
      </nav>
      
    </header>
    )
}

export default Nav;