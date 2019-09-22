import React from 'react';
import { connect } from "react-redux";
import { addAsic } from "../../redux/actions";
import {config} from "./../../config";

class AuthModal extends React.Component
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

    componentDidMount() {

        fetch(config.baseExpressUrl + 'setting').then(response => {
            return response.json();
        }).then(data => {
            console.log('settings', data);
            this.setState({
                auth_key: data.hlor_key
            });
        }).catch(err => {
            console.log(err.toString());
        })
    }

    addWorker() {

        this.state.ip = this.props.authData.ip;

        const form = new FormData();
        for(let prop in this.state) {
            form.append(prop, this.state[prop]);
        }

        console.log(this.state);
        console.log(this.props);

        // save to db
        fetch(config.baseExpressUrl + 'worker/save', {
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
            this.props.addAsic(data);
            window.$('#auth-modal').modal('hide');
        }).catch(err => {
            console.log(err.toString());
        })
    }


    onChangeField(e, name) {
        this.state[name] = e.currentTarget.value;
    }

    onCancel() {
        window.$('#auth-modal').modal('hide');
    }

    render() {
        return (
            <div id="auth-modal" className="modal modal-center fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Authorization Data</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
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
                                <small className="form-text">Default password is <strong> root</strong></small>
                            </div>
                            <div className="form-group has-form-text">
                                <input type="text"
                                       pattern="^[_A-z0-9]{1,}$"
                                       className="form-control"
                                       id="worker_name"
                                       placeholder="Worker Name"
                                       onChange={e => this.onChangeField(e, 'worker_name')}
                                       required
                                />
                                <label className="label-floated" htmlFor="username">Worker Name</label>
                                {/*<small className="form-text">Set</small>*/}
                            </div>
                            <div className="form-group has-form-text">
                                <input type="text"
                                       pattern="^[_A-z0-9]{1,}$"
                                       className="form-control"
                                       id="auth_key"
                                       placeholder="Key"
                                       onChange={e => this.onChangeField(e, 'auth_key')}
                                       defaultValue={this.state.auth_key}
                                       required
                                />
                                <label className="label-floated" htmlFor="username">Key</label>
                                <small className="form-text">Hlor Key is provided in your settings</small>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-bold btn-pure btn-lg btn-primary" type="button" onClick={this.onCancel.bind(this)}>Cancel</button>
                            <button className="btn btn-bold btn-pure btn-lg btn-primary" type="button" onClick={this.addWorker.bind(this)}>Add Worker</button>
                        </div>
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
            dispatch(addAsic(asic))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthModal)
