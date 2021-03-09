import React, { Component } from "react";
import {
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavLink,
    Nav,
    Container,
    NavbarToggler,
} from "reactstrap";
import avatar from "../../images/Bobby.png";

export class AdminNavbar extends Component {
    render() {
        return (
            <>
                <Navbar sticky="top" expand="lg">
                    <Container>
                        <div className="navbar-wrapper">
                            <div className="navbar-toggle d-inline">
                                <NavbarToggler>
                                    <span className="navbar-toggler-bar bar1" />
                                    <span className="navbar-toggler-bar bar2" />
                                    <span className="navbar-toggler-bar bar3" />
                                </NavbarToggler>
                            </div>
                            <NavbarBrand>
                                PLEX
                            </NavbarBrand>
                        </div>
                        <NavbarToggler>
                            <span className="navbar-toggler-bar navbar-kebab" />
                            <span className="navbar-toggler-bar navbar-kebab" />
                            <span className="navbar-toggler-bar navbar-kebab" />
                        </NavbarToggler>
                        <Collapse navbar isOpen={false}>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle
                                        caret
                                        color="default"
                                        nav
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <div className="photo">
                                            <img
                                                alt="..."
                                                src={avatar}
                                            />
                                        </div>
                                        <b className="caret d-none d-lg-block d-xl-block" />
                                        <p className="d-lg-none">Log out</p>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-navbar" right tag="ul">
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">Profile</DropdownItem>
                                        </NavLink>
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">Settings</DropdownItem>
                                        </NavLink>
                                        <DropdownItem divider tag="li" />
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">Log out</DropdownItem>
                                        </NavLink>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}