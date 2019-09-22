import React from 'react';
import PageContainer from "./PageContainer";
import {config} from '../config';

export default class Logs extends React.Component
{
    state = {
        logs: {
            status: 'on'
        },
        content: ''
    };

    constructor(props) {
        super(props);

        //check auth
        const token = window.localStorage.getItem('token');

        if (token === null) {
            this.props.history.push('/login');
        }

    }

    componentDidMount() {
        fetch(config.baseExpressUrl + 'log/read').then(async response => {
            const data = await response.json();

            this.setState({
                content: data.logData
            });
            console.log(data);
        }).catch(err => {
            console.log('err:', err);
        })
    }

    changeLogStatus(e) {
        console.log(e.currentTarget.checked);
    }

    downloadLogs() {
        // download('Здесь логи', 'hlor-client-logs.txt', 'text/plain')
        console.log('download logs');
    }

    render() {
        return (
            <PageContainer>
                <main className="main-container">
                    <div className="main-content">

                        <div className="card">
                            <header className="card-header bb-2">
                                <h4 className="card-title">
                                    <strong>Hlor Client Consolidated Logs</strong>
                                    <small className="subtitle">Logs are combined from all connected workers</small>
                                </h4>

                                <label className="switch switch-border switch-primary"
                                       data-provide="tooltip"
                                       data-original-title="Turn Logs Off/On">
                                    <input type="checkbox" onChange={this.changeLogStatus.bind(this)}/>
                                        <span className="switch-indicator"></span>
                                </label>
                            </header>


                            <div className="scrollable h-620px">

                                <div className="media" style={{overflow: 'scroll', height: '600px'}}>
                                    <div className="media-body"  dangerouslySetInnerHTML={{__html: this.state.content}}>
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:52-0400</time>*/}
                                            {/*&nbsp;<span>Connecting</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Connect 192.168.1.1:22</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:52-0400</time>*/}
                                            {/*&nbsp;<span>Start Hlor daemon</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Please wait while BMMiner application starts</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Next attempt in 60 seconds ...</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400 :white_check_mark:</time>*/}
                                            {/*&nbsp;<span>Defined pool => stratum.antpool.com</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400 :white_check_mark:</time>*/}
                                            {/*&nbsp;<span>Defined coin => BTC</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 1, current val: 118600.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 2, current val: 236470.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 3, current val: 354302.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 4, current val: 472208.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 5, current val: 590570.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 6, current val: 708056.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 7, current val: 825942.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 8, current val: 1062371.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 9, current val: 1181719.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 10, current val: 130457.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400 :white_check_mark:</time>*/}
                                            {/*&nbsp;<span>Defined pool => stratum.antpool.com</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400 :white_check_mark:</time>*/}
                                            {/*&nbsp;<span>Defined coin => BTC</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400 :moneybag:</time>*/}
                                            {/*&nbsp;<span className="badge-primary">Data successfully sent to Explorer, calculated hashrate 80473878482565</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400 :white_check_mark:</time>*/}
                                            {/*&nbsp;<span>Defined pool => stratum.antpool.com</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400 :white_check_mark:</time>*/}
                                            {/*&nbsp;<span>Defined coin => BTC</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 1, current val: 118600.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 2, current val: 236470.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 3, current val: 354302.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 4, current val: 472208.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 5, current val: 590570.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 6, current val: 708056.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 7, current val: 825942.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 8, current val: 1062371.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 9, current val: 1181719.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Calculate value - current step: 10, current val: 130457.92000</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T10:10:08-0400 :bangbang:</time>*/}
                                            {/*&nbsp;<span className="badge-danger">Error: connect REFUSED</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T10:10:08-0400 :interrobang:</time>*/}
                                            {/*&nbsp;<span className="badge-danger">Access denied! Wrong Username or Key</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T10:10:08-0400 :bangbang:</time>*/}
                                            {/*&nbsp;<span className="badge-danger">Your version is deprecated! Download the latest version from Github</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T10:10:08-0400 :warning:</time>*/}
                                            {/*&nbsp;<span className="badge-warning">You dont seem to have an active internet connection</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T10:10:08-0400 :warning:</time>*/}
                                            {/*&nbsp;<span className="badge-warning">Sorry your pool " + pool + " hasnt integrated yet. You can not achieve HLOR. Despite this, your miner will work fine. Follow our updates, or contact us directly with the request to add your pool</span>*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Connect 192.168.1.1:22</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Connect 192.168.1.1:22</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Connect 192.168.1.1:22</span></p>*/}
                                    </div>
                                </div>

                                <div className="media media-meta-day"><span id="date"></span></div>

                                <div className="media">
                                    <div className="media-body">
                                        {/*{this.state.content}*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:52-0400</time>*/}
                                            {/*&nbsp;<span>Connecting</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Connect 192.168.1.1:22</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Connect 192.168.1.1:22</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Connect 192.168.1.1:22</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Connect 192.168.1.1:22</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Connect 192.168.1.1:22</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Connect 192.168.1.1:22</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Connect 192.168.1.1:22</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Connect 192.168.1.1:22</span></p>*/}
                                        {/*<p>*/}
                                            {/*<time dateTime="2018">2019-06-04T09:59:53-0400</time>*/}
                                            {/*&nbsp;<span>Connect 192.168.1.1:22</span></p>*/}
                                    </div>
                                </div>

                            </div>

                            <div className="publisher bt-1 border-light">
                                <a className="publisher-btn"
                                   href=""
                                   id="save"
                                   onClick={this.downloadLogs.bind(this)}>
                                    <i className="fa fa-save"/>
                                </a>
                                <a className="publisher-btn" href="#">
                                    <i className="fa fa-envelope"/>
                                </a>
                                <a className="publisher-btn text-info" href="#">
                                    <i className="fa fa-paper-plane"/>
                                </a>
                            </div>

                        </div>


                    </div>

                    <div className="">
                        {/*<button className="btn btn-float btn-primary add-btn" data-toggle="modal" data-target="#add-worker"*/}
                                {/*data-provide="tooltip" data-original-title="Add Worker"><i className="ti-plus"></i></button>*/}

                        {/*modal*/}
                    </div>

                </main>
            </PageContainer>
        )
    }
}
