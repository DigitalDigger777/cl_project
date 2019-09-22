import React from 'react';
import PageContainer from "./PageContainer";

export default class About extends React.Component
{
    constructor(props) {
        super(props);

        //check auth
        const token = window.localStorage.getItem('token');

        if (token === null) {
            this.props.history.push('/login');
        }

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
                            <h4 className="card-title">About <strong>Hlor Project</strong></h4>

                            <div className="card-body">


                            </div>
                        </div>

                        <div className="row">

                            <div className="col-lg-2 my-2">
                                <div className="flexbox flex-justified text-center bg-white">
                                    <a href="https://github.com/HLORbc" onClick={this.openUrl.bind(this)}>
                                        <div className="media flex-column no-shrink pt-30 align-items-center">
                                            <span className="ti-twitter fs-40 text-info"></span>
                                            <code className="w-100 text-center">Hlor Team</code>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="col-lg-2 my-2">
                                <div className="flexbox flex-justified text-center bg-white">
                                    <a href="https://github.com/hlor" onClick={this.openUrl.bind(this)}>
                                        <div className="media flex-column no-shrink pt-30 align-items-center">
                                            <span className="ti-twitter fs-40 text-info"></span>
                                            <code className="w-100 text-center">Hlor Token</code>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="col-lg-2 my-2">
                                <div className="flexbox flex-justified text-center bg-white">
                                    <a href="https://github.com/hlor" onClick={this.openUrl.bind(this)}>
                                        <div className="no-shrink py-35">
                                            <span className="ti-github fs-40 text-dark"></span>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="col-lg-2 my-2">
                                <div className="flexbox flex-justified text-center bg-white">
                                    <a href="https://www.facebook.com/HLORFOUNDATION/" onClick={this.openUrl.bind(this)}>
                                        <div className="no-shrink py-35">
                                            <span className="ti-facebook fs-40" style={{color: '#3b5998'}}></span>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="col-lg-2 my-2">
                                <div className="flexbox flex-justified text-center bg-white">
                                    <a href="https://www.reddit.com/r/Hlor/" onClick={this.openUrl.bind(this)}>
                                        <div className="no-shrink py-35">
                                            <span className="ti-reddit fs-40 text-danger"></span>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="col-lg-2 my-2">
                                <div className="flexbox flex-justified text-center bg-white">
                                    <a href="https://t.me/hlorf" onClick={this.openUrl.bind(this)}>
                                        <div className="no-shrink py-35">
                                            <span className="fa fa-paper-plane fs-40" style={{color: '#5580a3'}}></span>
                                        </div>
                                    </a>
                                </div>
                            </div>

                        </div>


                    </div>

                    {/*<div className="">*/}
                        {/*<button className="btn btn-float btn-primary add-btn" data-toggle="modal" data-target="#add-worker"*/}
                                {/*data-provide="tooltip" data-original-title="Add Worker"><i className="ti-plus"></i></button>*/}

                        {/*/!*Modal*!/*/}
                    {/*</div>*/}
                </main>
            </PageContainer>
        )
    }
}
