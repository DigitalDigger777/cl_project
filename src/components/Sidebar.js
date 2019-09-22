import React from 'react';
import {  withRouter, Link } from "react-router-dom";
import Settings from "../pages/Settings";


class Sidebar extends React.Component
{
    state = {
        theme: 'white'
    };

    constructor(props){
        super(props);
        console.log(this.props.location);
    }

    changeTheme(e) {
        console.log(e.currentTarget.checked);
        this.setState({
            theme: e.currentTarget.value
        });
    }

    render() {
        return (
            <aside className="sidebar sidebar-expand-lg sidebar-iconic sidebar-light">
                <header className="sidebar-header">
                    <span className="logo text-center">
                      <a href="/dashboard">
                          <img src="assets/img/logos/logo-grey.png" alt="hlor logo"/>
                      </a>
                    </span>
                </header>

                <nav className="sidebar-navigation">
                    <ul className="menu">
                        <li className={'menu-item ' + (window.location.pathname == '/' ? 'active' : '')}>
                            <Link className="menu-link" to="/dashboard" title="Dashboard provides a snapshot and visualization of your data">
                                <span className="icon ti-dashboard"/>
                                <span className="title">Dashboard</span>
                            </Link>
                        </li>
                        <li className={'menu-item ' + (window.location.pathname == '/network' ? 'active' : '')}>
                            <Link className="menu-link" to="/network" title="Network scanner detects ASICs on your local network">
                                <span className="icon ti-search"/>
                                <span className="title">Network</span>
                                <span className="badge badge-pill badge-secondary">2</span>
                            </Link>
                        </li>
                        <li className={'menu-item ' + (window.location.pathname == '/logs' ? 'active' : '')}>
                            <Link className="menu-link" to="/logs" title="Logs are automatically generated, time-stamped records">
                                <span className="icon ti-pulse"/>
                                <span className="title">Logs</span>
                            </Link>
                        </li>
                        <li className={'menu-item ' + (window.location.pathname == '/settings' ? 'active' : '')}>
                            <Link className="menu-link" to="/settings" title="Initial configuration of Hlor Client and Hlor User Account">
                                <span className="icon ti-settings"/>
                                <span className="title">Settings</span>
                            </Link>
                        </li>
                        <li className={'menu-item ' + (window.location.pathname == '/about' ? 'active' : '')}>
                            <Link className="menu-link" to="/about" title="About Hlor Client and Hlor Project">
                                <span className="icon ti-desktop"/>
                                <span className="title">Hlor Client</span>
                                <span className="badge badge-pill badge-danger">1</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/*Dark and Version*/}
                <ul className="menu mb-0 text-center" data-provide="tooltip" data-original-title="Coming Soon">
                    <label className="switch switch-border switch-dark">
                            <input type="checkbox" disabled="" onChange={this.changeTheme.bind(this)} />
                            <span className="switch-indicator "/>
                            <span className="switch-description">Dark</span>
                    </label>
                    <p className=" text-hlor fs-10">Version <span>1.0</span></p>
                </ul>

            </aside>
        )
    }
}


export default withRouter(Sidebar);


