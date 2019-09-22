import React from 'react';
import { connect } from "react-redux";
import { addAsic } from "../../redux/actions";

class UserModal extends React.Component
{
    state = {
        ip: '',
        username: '',
        password: '',
        worker_name: '',
        auth_key: ''
    };

    constructor(props) {
        super(props);
        this.onChangeField = this.onChangeField.bind(this);
    }

    addWorker() {


        const form = new FormData();
        for(let prop in this.state) {
            form.append(prop, this.state[prop]);
        }

        console.log(this.state);

        // save to db
        fetch('http://localhost:2808/worker/save', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            if (typeof data.error === 'undefined') {
                this.props.addAsic(data);
                window.$('#add-worker').modal('hide');
            } else {
                alert(data.error.message);
            }
        }).catch(err => {
            console.log(err.toString());
        })
    }

    onChangeField(e, name) {
        this.state[name] = e.currentTarget.value;
    }

    render() {
        return (
            <div className="modal modal-center fade " id="add-worker" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <form data-provide="wizard" noValidate>
                            <ul className="nav nav-process nav-process-block">

                                <li className="nav-item processing">
                                    <a className="nav-link active" data-toggle="tab" href="#asic">
                                        <span className="nav-link-number">1</span>
                                        <div className="nav-link-body">
                                            <span className="nav-title">Personal info</span>
                                            <span>Name and address</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#worker">
                                        <span className="nav-link-number">2</span>
                                        <div className="nav-link-body">
                                            <span className="nav-title">Billing info</span>
                                            <span>Credit card info</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">

                                <div className="tab-pane fade form-type-material px-80 pt-30 active show" id="asic" data-provide="validation">
                                    <h4>If you don’t know your root credentials, keep default value</h4>
                                    <br/>
                                        <div className="form-group has-form-text">
                                            <input type="text"
                                                   pattern="((^|\.)((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]?\d))){4}$"
                                                   maxLength="15"
                                                   className="form-control"
                                                   id="ip"
                                                   onChange={e => this.onChangeField(e, 'ip')}
                                                   required
                                            />
                                                <label htmlFor="ip">IP Address</label>
                                                <small className="form-text">For example <strong> 192.168.1.100</strong></small>
                                        </div>
                                        <div className="form-group has-form-text">
                                                <input type="text"
                                                       pattern="^[_A-z0-9]{1,}$"
                                                       maxLength=""
                                                       className="form-control"
                                                       id="username"
                                                       placeholder="root"
                                                       onChange={e => this.onChangeField(e, 'username')}
                                                       required
                                                />
                                                <label className="label-floated" htmlFor="username">Username</label>
                                                <small className="form-text">Default username is <strong> root</strong></small>
                                        </div>
                                        <div className="form-group has-form-text">
                                                <input type="password"
                                                       className="form-control"
                                                       id="password"
                                                       placeholder="admin"
                                                       onChange={e => this.onChangeField(e, 'password')}
                                                       required
                                                />
                                                <label className="label-floated" htmlFor="password">Password</label>
                                                <small className="form-text">Default password is <strong> admin</strong></small>
                                        </div>
                                </div>

                                <div className="tab-pane fade form-type-material px-80 pt-30" id="worker" data-provide="validation">
                                    <h4>Please provide your Worker name and Hlor Key</h4>
                                    <br/>
                                        <div className="form-group has-form-text">
                                                <input type="text"
                                                       pattern="^[_A-z0-9]{1,}$"
                                                       maxLength=""
                                                       className="form-control"
                                                       id="worke_rname"
                                                       onChange={e => this.onChangeField(e, 'worker_name')}
                                                       required/>
                                                <label htmlFor="workername">Worker Name</label>
                                                <small className="form-text">Any name to help identify your mining device</small>
                                        </div>
                                        <div className="form-group has-form-text">
                                                <input type="text"
                                                       className="form-control"
                                                       id="auth_key"
                                                       onChange={e => this.onChangeField(e, 'auth_key')}
                                                       required />
                                                <label htmlFor="key">Key</label>
                                                <small className="form-text">Hlor Key is provided in your settings</small>
                                        </div>
                                </div>

                            </div>
                            <div className="modal-footer pr-60 ">
                                <button type="button" className="btn btn-bold btn-pure btn-lg btn-secondary float-right" data-dismiss="modal">Cancel</button>
                                <button className="btn btn-bold btn-pure btn-lg btn-primary" data-wizard="prev" type="button">Back</button>
                                <button className="btn btn-bold btn-pure btn-lg btn-primary" data-wizard="next" type="button">Next</button>
                                <button className="btn btn-bold btn-pure btn-lg btn-primary" data-wizard="finish" type="button" onClick={this.addWorker.bind(this)}>Finish</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ asics: state.asics });


const mapDispatchToProps = dispatch => {
    return {
        addAsic: asic => {
            console.log(asic);
            dispatch(addAsic(asic))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserModal)
