import React from 'react';
import UserContainer from "./UserContainer";
import {config} from "../../config";

export default class Locked extends React.Component
{
    state = {
        fields: {
            username: null,
            password: null
        }
    };

    constructor(props) {
        super(props);
        this.state.fields.username = window.localStorage.getItem('email');
    }

    changeField(e, name) {
        this.state.fields[name] = e.currentTarget.value;
        this.setState(this.state);
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
                mode: 'cors',
                cache: 'no-cache',
                body: JSON.stringify(this.state.fields)
            }).then(response => {
                return response.json();
            }).then(data => {

                if (data.token) {
                    window.localStorage.setItem('token', data.token);
                    window.localStorage.setItem('email', data.email);
                    window.localStorage.setItem('name', data.first_name + ' ' + data.last_name);

                    this.props.history.push('/');
                } else {
                    alert(data.error.message);
                }
            })
        }
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
                            <br/><br/><br/>
                                <h4 className="text-white">Hlor Client is the interface between local workers and Hlor
                                    Explorer</h4>
                                <p className="text-white">All original Hlor software is only available at <a
                                    className="text-hlor fw-400" href="https://github.com/hlor" onClick={this.openUrl.bind(this)}>GITHUB.COM/HLOR</a> <br/>DO
                                    NOT DOWNLOAD FROM OTHER WEBSITES</p>
                                <br/><br/>
                        </div>
                    </div>
                </div>


                <div className="col-md-6 col-lg-5 col-xl-4 align-self-center">
                    <div className="px-80 py-30 text-center">
                        <div>
                            <img className="avatar avatar-xxl" src="/assets/img/avatar/default.jpg" alt="..."/>
                                <br/><br/>
                                    <h5 className="lead">Vlad Timm</h5>
                                    <small>Enter your password to retrieve your session</small>
                        </div>

                        <hr className="w-30px"/>

                            <form className="form-type-material" data-provide="validation" data-disable="true">
                                <div className="form-group">
                                    <input type="password"
                                           className="form-control"
                                           id="password"
                                           onChange={e => this.changeField(e, 'password')}
                                           required/>
                                        <label htmlFor="password">Password</label>
                                </div>
                                <br/>
                                <button className="btn btn-bold btn-block btn-primary"
                                        type="button"
                                        onClick={this.login.bind(this)}>Enter</button>
                            </form>

                    </div>
                </div>
            </UserContainer>
        )
    }
}
