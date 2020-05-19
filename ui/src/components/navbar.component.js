
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Smartzy</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/smart-devices" className="nav-link">Smart Devices</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/pair-device" className="nav-link">Pair Smart Devices</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/device-type" className="nav-link">Add new device</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}