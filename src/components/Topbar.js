import React from 'react';

export default class Topbar extends React.Component
{
    openUrl(e) {
        e.preventDefault();
        const {shell} = window.require('electron');
        const href = e.currentTarget.href;

        shell.openExternal(href);
    }

    render() {
        return (
            <header className="topbar">

                <ul className="topbar-btns">
                    <li className="dropdown d-none d-md-block">
                        {/*<span className="topbar-btn has-new" data-toggle="dropdown" data-provide="tooltip" data-original-title="Notifications">*/}
                            {/*<i className="ti-bell"></i>*/}
                        {/*</span>*/}
                        <div className="dropdown-menu">

                            <div className="media-list media-list-hover media-list-divided media-list-xs">
                                <a className="media media-new" href="#">
                                    <span className="avatar bg-success"><i className="ti-user"></i></span>
                                    <div className="media-body">
                                        <p>New user registered</p>
                                        <time dateTime="2018-07-14 20:00">Just now</time>
                                    </div>
                                </a>

                                <a className="media" href="#">
                                    <span className="avatar bg-info"><i className="ti-shopping-cart"></i></span>
                                    <div className="media-body">
                                        <p>New order received</p>
                                        <time dateTime="2018-07-14 20:00">2 min ago</time>
                                    </div>
                                </a>

                                <a className="media" href="#">
                                    <span className="avatar bg-warning"><i className="ti-face-sad"></i></span>
                                    <div className="media-body">
                                        <p>Refund request from <b>Ashlyn Culotta</b></p>
                                        <time dateTime="2018-07-14 20:00">24 min ago</time>
                                    </div>
                                </a>
                            </div>

                            <div className="dropdown-footer">
                                <div className="left">
                                    <a href="#">Read all notifications</a>
                                </div>

                                <div className="right">
                                    <a href="#" data-provide="tooltip" title="Mark all as read"><i className="fa fa-circle-o"></i></a>
                                    <a href="#" data-provide="tooltip" title="Update"><i className="fa fa-repeat"></i></a>
                                    <a href="#" data-provide="tooltip" title="Settings"><i className="fa fa-gear"></i></a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>

                <div className="topbar-right">
                    <ul className="topbar-btns">
                        <li className="dropdown">
                            <span className="topbar-btn" data-toggle="dropdown">
                               <img className="avatar" src="assets/img/avatar/default.jpg"/>
                            </span>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a
                                    className="dropdown-item" href="https://hlor.io/profile/"
                                    onClick={this.openUrl.bind(this)}
                                >
                                    <i className="ti-user"></i>HLOR.IO Account
                                </a>
                                <a className="dropdown-item" href="/settings"><i className="ti-settings"></i> Settings</a>
                                <a className="dropdown-item" href="/locked"><i className="ti-lock"></i> Lock</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/login"><i className="ti-power-off"></i> Logout</a>
                            </div>
                        </li>
                    </ul>

                    <a className="topbar-btn" href="/locked" data-provide="tooltip" data-original-title="Lock Client">
                        <i className="icon fs-18 ti-lock"></i>
                    </a>

                    <div className="topbar-divider"></div>

                    <a className="btn btn-xs btn-round btn-hlor-outline mr-2"
                       href="https://hlor.io"
                       onClick={this.openUrl.bind(this)}
                    >
                        Hlor Explorer
                    </a>

                </div>
            </header>
        )
    }
}
