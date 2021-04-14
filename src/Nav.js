import React, { useContext } from "react";
import {NavLink} from "react-router-dom";
import "./Nav.css";
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Nav from 'react-bootstrap/Nav';
import UserContext from "./UserContext";

// NavBar capitolization is crucial since Navbar and Nav are taken by Bootstrap
/** Grab user and logout function from UserContext,
 *  if user exists, return logged in navbar.
 *  If not then give navbar with sign up or log in
 */
const NavBar = () => {
    const {user, logout} = useContext(UserContext);

    if(user){
        return (
            <>
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Navbar.Brand href="/" className="m-auto navbar-brand"><h2>anonChat</h2></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto navbar-items">
                            <NavLink to="/create">Create New anonChat</NavLink>
                            <NavLink to="/contacts">Contacts</NavLink>
                            <NavLink to="/profile">Profile</NavLink>
                            <NavLink to="/" id="navbar-logout">
                                <div className="navbar-logout-div" onClick={logout}>
                                    Logout
                                </div>
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }

    return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">anonChat</Navbar.Brand>
                <Nav className="ml-auto navbar-items">
                    <NavLink to="/signup">Sign Up</NavLink>
                    <NavLink to="/login">Log In</NavLink>
                </Nav>
            </Navbar>
    );

}

export default NavBar;