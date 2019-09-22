import React from 'react';
import UserContainer from "./UserContainer";

export default class Password extends React.Component
{
    openUrl(e) {
        e.preventDefault();
        const {shell} = window.require('electron');
        const href = e.currentTarget.href;

        shell.openExternal(href);
    }

    render() {
        return (
            <UserContainer>
                <div className="col-md-6 col-lg-7 col-xl-8 d-none d-md-block bg-img overlay-darker" data-overlay="5">

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
                    <div className="px-80 py-30">
                        <h4>Password recovery</h4>
                        <p>
                            <small>We'll send you instructions in email</small>
                        </p>
                        <br/>

                            <form className="form-type-material" data-provide="validation" data-disable="true">
                                <div className="form-group">
                                    <input type="email" className="form-control" id="email" required/>
                                        <label htmlFor="email">Email address</label>
                                </div>

                                <br/>
                                    <button className="btn btn-bold btn-block btn-primary" type="submit"
                                            id="toast">Reset
                                    </button>
                            </form>

                    </div>
                </div>
            </UserContainer>
        )
    }
}
