import React from 'react';
// import {sqlite3} from 'sqlite3';
import { config } from '../../config';
import UserContainer from "./UserContainer";
//const fs = require('electron').remote.require('fs');

export default class Login extends React.Component
{
    state = {
        fields: {
            username: null,
            password: null
        }
    };

    constructor(props) {
        super(props);
        this.changeField = this.changeField.bind(this);
        window.localStorage.clear();
    }

    openUrl(e) {
        e.preventDefault();
        const {shell} = window.require('electron');
        const href = e.currentTarget.href;

        shell.openExternal(href);
    }

    login() {

        if (this.state.fields.username && this.state.fields.password) {
            fetch(config.baseExpressUrl + 'hlor/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.fields)
            }).then(response => {
                return response.json();
            }).then(data => {

                if (data.token) {
                    window.localStorage.setItem('token', data.token);
                    window.localStorage.setItem('email', data.email);
                    window.localStorage.setItem('name', data.first_name + ' ' + data.last_name);

                    this.props.history.push('/dashboard');
                } else {
                    alert(data.error.message);
                }
            }).catch(err => {
                console.log(err.response);
            })
        }
    }

    changeField(e, name) {
        this.state.fields[name] = e.currentTarget.value;
        this.setState(this.state);
    }

    render() {
        return (
            <UserContainer>
                <div className="col-md-6 col-lg-7 col-xl-8 d-none d-md-block bg-img" data-overlay="5">

                    <div className="row h-100 pl-50">
                        <div className="col-md-10 col-lg-8 align-self-end">
                            <a href="/">
                                <img src="/assets/img/logos/logo-white.png" className="pr-50" alt="Hlor Client"/>
                            </a>
                            <br/>
                            <br/>
                            <br/>

                            <h4 className="text-white">
                                Hlor Client is the interface between local workers and Hlor Explorer
                            </h4>
                            <p className="text-white">
                                All original Hlor software is only available at
                                <a className="text-hlor fw-400" href="https://github.com/hlor" onClick={this.openUrl.bind(this)}>GITHUB.COM/HLOR</a>
                                <br/>
                                DO NOT DOWNLOAD FROM OTHER WEBSITES
                            </p>

                            <br/>
                            <br/>
                        </div>
                    </div>

                </div>

                <div className="col-md-6 col-lg-5 col-xl-4 align-self-center">

                    <div className="px-80 py-30">
                        <h4>SIGN IN</h4>
                        <p>
                            <small>Log in to your Hlor account</small>
                        </p>
                        <br/>
                        <form className="form-type-material" data-provide="validation" data-disable="true">
                            <div className="form-group">
                                <input type="text"
                                       pattern="^[_A-z0-9]{1,}$"
                                       maxLength=""
                                       className="form-control"
                                       id="username"
                                       onChange={e => this.changeField(e, 'username')}
                                       required />
                                    <label htmlFor="username">Username</label>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       className="form-control"
                                       id="password"
                                       onChange={e => this.changeField(e, 'password')}
                                       required/>
                                <label htmlFor="password">Password</label>
                            </div>
                            <br/>
                            <div className="form-group">
                                <button className="btn btn-bold btn-block btn-primary" onClick={this.login.bind(this)}>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>


                    <div className="px-80 py-30" hidden>
                        <h4>You have two-factor authentication enabled</h4>
                        <p>
                            <small>Please enter the 6-digit code specified in your 2FA application</small>
                        </p>
                        <br/>
                            <form className="form-type-material" data-provide="validation" data-disable="true">
                                <div className="form-group">
                                    <input type="number" maxLength="" className="form-control" id="code" required/>
                                    <label htmlFor="code">Authentication Code</label>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <button className="btn btn-bold btn-block btn-primary" type="submit">
                                        Continue
                                    </button>
                                </div>
                            </form>
                    </div>

                </div>
            </UserContainer>
        )
    }
}
