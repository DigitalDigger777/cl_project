import React from 'react';
import PageContainer from "./PageContainer";
import ReactTable from "react-table";
import UserModal from '../components/modals/UserModal';
import DashboardTable from '../components/DashboardTable';
import "react-table/react-table.css";
import { connect } from "react-redux";
import {config} from '../config';
import {addAsic, clearAsics} from "../redux/actions";

class Home extends React.Component
{
    state = {
        columns: [
            {
                Header: "Miner type",
                accessor: "minerType"
            },
            {
                Header: "IP Address",
                accessor: "ip"
            },
            {
                Header: "Worker name",
                accessor: "worker"
            },
            {
                Header: "Coin",
                accessor: "coin"
            },
            {
                Header: "Avg hashes",
                accessor: "hashes"
            },
            {
                Header: "Age",
                accessor: "age"
            },
            {
                Header: "Status",
                accessor: "status"
            }
        ],
        data: [
            {
                active: true,
                coin: "BTC",
                hashes: 8895157157.60739,
                hlor: 137.326763340519,
                ip: "192.168.1.266",
                minerType: "Antminer S9",
                worker: "Otto"
            }
        ]
    }

    constructor(props) {
        super(props);

        //check auth
        const token = window.localStorage.getItem('token');

        if (token === null) {
            this.props.history.push('/login');
        }

    }

    componentDidMount() {
        fetch(config.baseExpressUrl + 'worker/list').then(response => {
            return response.json();
        }).then(data => {
            this.props.clearAsics();

            for (let i = 0; i < data.length; i++) {
                this.props.addAsic(data[i]);
            }
        });

        setInterval(() => {
            fetch(config.baseExpressUrl + 'worker/list').then(response => {
                return response.json();
            }).then(data => {
                this.props.clearAsics();

                for (let i = 0; i < data.length; i++) {
                    this.props.addAsic(data[i]);
                }
            });
        }, 60000);

    }

    render() {
        const data = [];
        return (
            <PageContainer>
                <main className="main-container">
                    <div className="main-content">

                        {/*Cards*/}

                        <div className="row">
                            <div className="col-lg-3">
                                <div className="card card-body">
                                    <h6>
                                        <span className="text-uppercase">Workers</span>
                                        <span className="float-right">
                                            <a className="btn btn-xs btn-primary" href="./workers.html">View</a>
                                        </span>
                                    </h6>
                                    <br/>
                                    <p className="fs-28 fw-100">{this.props.asics.length}</p>
                                    <div className="progress">
                                        <div className="progress-bar bg-danger"
                                             role="progressbar"
                                             style={{width: '35%', height: '4px'}}
                                             aria-valuenow="35"
                                             aria-valuemin="0"
                                             aria-valuemax="100"></div>
                                    </div>
                                    <div className="text-gray fs-12">
                                        <i className="ti-stats-down text-danger mr-1"></i> active workers
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <div className="card card-body">
                                    <h6>
                                        <span className="text-uppercase">Hashes</span>
                                    </h6>
                                    <br/>
                                    <p className="fs-20 fw-100">0</p>
                                    <div className="progress">
                                        <div className="progress-bar"
                                             role="progressbar"
                                             style={{width: '65%', height: '4px'}}
                                             aria-valuenow="65"
                                             aria-valuemin="0"
                                             aria-valuemax="100"></div>
                                    </div>
                                    <div className="text-gray fs-12">
                                        <i className="ti-stats-up text-success mr-1"></i> 324 more than last week
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <div className="card card-body">
                                    <h6>
                                        <span className="text-uppercase">Hlorides</span>
                                    </h6>
                                    <br/>
                                    <p className="fs-20 fw-100">0</p>
                                    <div className="progress">
                                        <div className="progress-bar bg-danger"
                                             role="progressbar"
                                             style={{width: '65%', height: '4px'}}
                                             aria-valuenow="65"
                                             aria-valuemin="0"
                                             aria-valuemax="100"></div>
                                    </div>
                                    <div className="text-gray fs-12">
                                        <i className="ti-stats-down text-danger mr-1"></i> %32 down from last week
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <div className="card card-body">
                                    <h6>
                                        <span className="text-uppercase">HLOR</span>
                                        <span className="float-right"><a className="btn btn-xs btn-primary" href="#">View</a></span>
                                    </h6>
                                    <br/>
                                    <p className="fs-20 fw-100">0</p>
                                    <div className="progress">
                                        <div className="progress-bar bg-danger"
                                             role="progressbar"
                                             style={{width: '65%', height: '4px'}}
                                             aria-valuenow="65"
                                             aria-valuemin="0"
                                             aria-valuemax="100"></div>
                                    </div>
                                    <div className="text-gray fs-12">
                                        <i className="ti-stats-down text-danger mr-1"></i> %32 down from last week
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="card">
                            <h4 className="card-title"><strong>Rows</strong> reordering</h4>

                            {/*<div className="card-body">*/}
                                {/*<div id="jsgrid-basic" data-provide="jsgrid"></div>*/}
                                {/*<div id="jsgrid-basic-1" data-provide="jsgrid, jqueryui"></div>*/}
                            {/*</div>*/}

                            <div className="card-body">
                                <DashboardTable/>
                            </div>
                        </div>

                    </div>

                    <div className="">
                        <button className="btn btn-float btn-primary add-btn" data-toggle="modal" data-target="#add-worker" data-provide="tooltip" data-original-title="Add Worker">
                            <i className="ti-plus"></i>
                        </button>

                        <UserModal/>
                    </div>

                </main>
            </PageContainer>
        )
    }
}

const mapStateToProps = state => ({
    asics: state.asics
});

const mapDispatchToProps = dispatch => {
    return {
        addAsic: asic => {
            console.log(asic);
            dispatch(addAsic(asic))
        },
        clearAsics: () => { dispatch(clearAsics())}
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
