import React from 'react';
import PageContainer from "./PageContainer";
import { Progress } from 'react-sweet-progress';
import AuthModal from './../components/modals/AuthModal';
import {config} from './../config';
import "react-sweet-progress/lib/style.css";


export default class Network extends React.Component
{
    state = {
        networkItems: [],
        showContent: true,
        scanProgress: 0,
        showPagination: false,
        authData: {
            ip: ''
        }
    };

    constructor(props) {
        super(props);

        //check auth
        const token = window.localStorage.getItem('token');

        if (token === null) {
            this.props.history.push('/login');
        }

        this.scan = this.scan.bind(this);
        this.onAddWorker = this.onAddWorker.bind(this);

    }

    componentDidMount() {
        //this.scan();
    }

    scan() {
        this.setState({
            scanProgress: 1,
            showContent: false
        });

        const timer = setInterval(() => {
            let scanProgress = this.state.scanProgress + 1;

            scanProgress = scanProgress === 100 ? 0 : scanProgress;

            this.setState({
                scanProgress: scanProgress
            });
        }, 1000);

        setTimeout(() => {
            fetch(config.baseExpressUrl + 'scan').then(response => {
                return response.json();
            }).then(data => {
                console.log(data);

                clearInterval(timer);
                this.setState({
                    networkItems: data,
                    showContent: true,
                    scanProgress: 100
                });
            })
        }, 1000)

    }

    onAddWorker(e, item) {

        const formData = new FormData();
        formData.append('ip', item.ip);

        fetch(config.baseExpressUrl + 'worker/check-ip', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ip: item.ip})
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.isset_ip) {
                alert('this ip is already on worker list');
            } else {

                if (item.is_asic) {
                    this.setState({
                        authData: {
                            ip: item.ip
                        }
                    });
                    window.$('#auth-modal').modal('show');
                } else {
                    alert('This is not asic');
                }
            }
        });

    }

    deleteDevice(e, item) {
        const devices = Object.assign([], this.state.networkItems);

        const index = devices.findIndex(deviceItem => deviceItem.ip === item.ip)

        devices.splice(index, 1);

        this.setState({
            networkItems: devices
        });
    }

    render() {
        return (
            <PageContainer>
                <main className="main-container">
                    <div className="main-content">
                        <div className="card">
                            <h4 className="card-title">
                                <strong>IP Scanner</strong>
                                <span className="float-right">
                                    <button
                                        className="btn btn-round btn-w-md btn-primary"
                                        onClick={this.scan}
                                    >
                                        Scan
                                    </button>
                                </span>
                            </h4>

                            <div className="card-body" style={{display: !this.state.showContent ? 'block' : 'none'}}>
                                <Progress type="circle" percent={this.state.scanProgress} status="active" />
                            </div>
                            <div className="card-body" style={{display: this.state.showContent ? 'block' : 'none'}}>


                                <div className="flexbox mb-20">
                                    <div className="lookup">
                                        <input className="w-200px" type="text" name="s" placeholder="Search"/>
                                    </div>
                                    <div className="btn-toolbar">
                                        <div className="btn-group btn-group-sm">
                                            <button className="btn" title="Refresh" data-provide="tooltip" onClick={this.scan.bind(this)}>
                                                <i className="ion-refresh"></i>
                                            </button>
                                            <button className="btn" title="Add new" data-provide="tooltip">
                                                <i className="ion-plus-round"></i>
                                            </button>
                                        </div>
                                        <div className="btn-group btn-group-sm ml-2 d-none d-sm-flex">
                                            <button className="btn dropdown-toggle" data-toggle="dropdown">Export</button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="#">CSV</a>
                                                <a className="dropdown-item" href="#">PDF</a>
                                                <a className="dropdown-item" href="#">Text</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <table className="table table-hover table-sm">
                                    <thead className="thead-light">
                                    <tr>
                                        <th className="w-40px"></th>
                                        <th>№</th>
                                        <th>Status</th>
                                        <th>IP</th>
                                        <th>Group</th>
                                        <th>Manufacturer</th>
                                        <th>MAC Address</th>
                                        <th>User</th>
                                        <th>Date</th>
                                        <th className="text-center w-100px">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.networkItems.map((item, index) => {

                                        let rowStyle = {};
                                        let iconStyle = {};

                                        // if (item.is_web_server && item.is_asic) {
                                        //     rowStyle = {
                                        //         background: '#33cabb',
                                        //         color: 'white',
                                        //         fontWeight: 'bold'
                                        //     }
                                        //
                                        //     iconStyle = {
                                        //         fontWeight: 'bold',
                                        //         color: 'white'
                                        //     }
                                        // }

                                        return (
                                            <tr key={index} style={rowStyle}>
                                                <td>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input"/>
                                                        <label className="custom-control-label"></label>
                                                    </div>
                                                </td>
                                                <th scope="row">{index + 1}</th>
                                                <td>On</td>
                                                <td>{item.ip}</td>
                                                <td>{item.hostname}</td>
                                                <td>{item.vendor}</td>
                                                <td>{item.mac}</td>
                                                <td>Admin</td>
                                                <td>2019-05-29 09:43:44</td>
                                                <td className="text-right table-actions">
                                                    <a className="table-action hover-primary" href="#" onClick={e => this.onAddWorker(e, item)}>
                                                        <i className="ti-plug" style={iconStyle}></i>
                                                    </a>
                                                    <a className="table-action hover-danger" href="#" onClick={e => this.deleteDevice(e, item)}>
                                                        <i className="ti-trash" style={iconStyle}></i>
                                                    </a>
                                                    {/*<div className="dropdown table-action">*/}
                                                        {/*<span className="dropdown-toggle no-caret hover-primary" data-toggle="dropdown">*/}
                                                            {/*<i className="ti-more-alt rotate-90"></i>*/}
                                                        {/*</span>*/}
                                                        {/*<div className="dropdown-menu dropdown-menu-right">*/}
                                                            {/*<a className="dropdown-item" href="#">*/}
                                                                {/*<i className="ti-menu-alt"></i> Details*/}
                                                            {/*</a>*/}
                                                            {/*<a className="dropdown-item" href="#">*/}
                                                                {/*<i className="ti-plug"></i>Add worker*/}
                                                            {/*</a>*/}
                                                            {/*<a className="dropdown-item" href="#">*/}
                                                                {/*<i className="ti-bar-chart"></i> Performance*/}
                                                            {/*</a>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    </tbody>
                                </table>


                                {/*<nav style={{display: this.state.showPagination ? 'block' : 'none'}}>*/}
                                    {/*<ul className="pagination justify-content-center mb-0">*/}
                                        {/*<li className="page-item disabled">*/}
                                            {/*<a className="page-link" href="#">*/}
                                                {/*<span className="ti-arrow-left"></span>*/}
                                            {/*</a>*/}
                                        {/*</li>*/}
                                        {/*<li className="page-item active">*/}
                                            {/*<a className="page-link" href="#">1</a>*/}
                                        {/*</li>*/}
                                        {/*<li className="page-item"><a className="page-link" href="#">2</a></li>*/}
                                        {/*<li className="page-item"><a className="page-link" href="#">3</a></li>*/}
                                        {/*<li className="page-item">*/}
                                            {/*<a className="page-link" href="#">*/}
                                                {/*<span className="ti-arrow-right"></span>*/}
                                            {/*</a>*/}
                                        {/*</li>*/}
                                    {/*</ul>*/}
                                {/*</nav>*/}

                            </div>
                        </div>

                    </div>

                    <div className="">
                        {/*<button className="btn btn-float btn-primary add-btn" data-toggle="modal" data-target="#add-worker"*/}
                                {/*data-provide="tooltip" data-original-title="Add Worker">*/}
                            {/*<i className="ti-plus"></i>*/}
                        {/*</button>*/}

                        {/*Modal*/}

                    </div>


                </main>
                <AuthModal authData={this.state.authData}/>
            </PageContainer>
        )
    }
}
