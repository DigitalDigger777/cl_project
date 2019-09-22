import React from 'react';
import PageContainer from "./PageContainer";
import {config} from "../config";
// import Electron from 'electron';
//import {ipcRenderer, fs} from "electron";
// const fs = require('fs');
//const shell = require('electron').shell;

export default class Settings extends React.Component
{
    state = {
        token: null,
        user: {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            phone: '',
            country: '',
            key: '',
            key_notes: ''
        }
    }

    constructor(props) {
        super(props);

        //check auth
        const token = window.localStorage.getItem('token');
        this.state.token = token;

        if (token === null) {
            this.props.history.push('/login');
        }

    }

    componentDidMount() {
        fetch(config.baseExpressUrl + 'hlor/user-info?token=' + this.state.token, {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            this.setState({
                user: data
            });
        }).catch(err => {
            window.location = '/login';
        });
    }

    openUrl(e) {
        e.preventDefault();
        const {shell} = window.require('electron');
        const href = e.currentTarget.href;

        shell.openExternal(href);
    }

    render() {
        return (
            <PageContainer>
                <main className="main-container">
                    <div className="main-content">

                        <div className="card">

                            <form className="tab-content card-body form-type-material">

                                <div className="card-body">
                                    <div className="flexbox gap-items-4">
                                        <img className="avatar avatar-xl" src="assets/img/avatar/default.jpg"/>
                                        <div className="flex-grow">
                                            <h5>{this.state.user.first_name} {this.state.user.last_name}</h5>
                                        </div>
                                    </div>

                                    <hr/>

                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group do-float">
                                                <input type="text" className="form-control-plaintext"
                                                       defaultValue={this.state.user.username}
                                                       disabled />
                                                <label>Username</label>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group do-float">
                                                <input type="text" className="form-control-plaintext"
                                                       defaultValue={this.state.user.email}
                                                       disabled/>
                                                <label>Email</label>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group do-float">
                                                <input type="text" className="form-control-plaintext"
                                                       defaultValue={this.state.user.phone} disabled/>
                                                <label>Phone Number</label>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group do-float">
                                                <input type="text" className="form-control-plaintext"
                                                       defaultValue={this.state.user.first_name} disabled/>
                                                <label>First Name</label>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group do-float">
                                                <input type="text" className="form-control-plaintext"
                                                       defaultValue={this.state.user.last_name} disabled/>
                                                <label>Last Name</label>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group do-float">
                                                <input type="text" className="form-control-plaintext"
                                                       defaultValue={this.state.user.country} disabled/>
                                                <label>Country</label>
                                            </div>
                                        </div>

                                    </div>

                                    <hr className="mt-1"/>

                                    <div>
                                        <p>
                                            To change your data, use the form in your profile on Hlor Explorer
                                            website
                                        </p>
                                        <a className="btn btn-bold btn-primary"
                                           href="https://hlor.io/profile/settings/"
                                           onClick={this.openUrl.bind(this)}
                                        >My Profile</a>
                                    </div>
                                </div>

                            </form>
                        </div>

                        <div className="card">
                            <div className="tab-pane card-body">
                                <h4 className="card-title fw-400"><strong>Hlor Addon Keys</strong></h4>
                                <div className="card-body ">
                                    <table className="table table-responsive-sm">
                                        <thead className="thead-light">
                                        <tr>
                                            <th>Key</th>
                                            <th>Notes</th>
                                            <th className="text-center w-100px"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th scope="row">{this.state.user.key}</th>
                                            <td>{this.state.user.key_notes}</td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <hr/>

                                    <div>
                                        <p>To change your keys, use the form on Hlor Explorer website</p>
                                        <a className="btn btn-bold btn-primary"
                                           href="https://hlor.io/profile/keys/"
                                           onClick={this.openUrl.bind(this)}
                                        >My Keys</a>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>

                    {/*modal*/}
                </main>
            </PageContainer>
        )
    }
}
