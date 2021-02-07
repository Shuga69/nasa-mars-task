import React, {Component} from 'react';
import "../styles/Header.css";
import {Container, Nav, Navbar} from 'react-bootstrap';
import logo from "../assets/logo.png"


export default class Header extends Component {
    render() {
        return (
            <Navbar  className="nav-bar">
                <Container className="nav-bar-container">
                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            className="d-inline-block align-top nav-logo"
                            alt="Logo"
                        />
                    </Navbar.Brand>
                    <h1 className="title">NASA`s expeditions to Mars</h1>
                </Container>
            </Navbar>
        )
    }
}