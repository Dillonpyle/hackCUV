import React from 'react'
import { Link } from 'react-router-dom';

const NavItem = (props) => {

    let currPage = props.path.charAt(0).toUpperCase() + props.path.substring(1, props.path.length)
    let itemClass = "nav-item nav-link";
    if (window.location.pathname === "/" + props.path) {
        itemClass += " active"
    }

    return (
        <Link to={'/' + props.path} onClick={props.updateNav.bind(this, props.path)} className={itemClass + " navText"}> {currPage} </Link>
    )
}

export default NavItem