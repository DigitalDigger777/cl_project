import React from 'react';
import {  withRouter, Link } from "react-router-dom";
import 'jsgrid/dist/jsgrid.css';
import 'jsgrid/dist/jsgrid-theme.css';
import { connect } from "react-redux";
import Home from "../pages/Home";
import moment from 'moment';

import {config} from '../config'


class DashboardTable extends React.Component
{

    onEdit(e, id) {
        const tr = e.currentTarget.closest('tr');

        if (e.currentTarget.classList.contains('jsgrid-update-button')) {

            tr.querySelector('.worker_name').querySelector('span').style.display = 'block';
            tr.querySelector('.worker_name').querySelector('input').type = 'hidden';
            e.currentTarget.classList.remove('jsgrid-update-button');
            e.currentTarget.classList.add('jsgrid-edit-button');

            const worker_name = tr.querySelector('.worker_name').querySelector('input').value;

            //save worker name
            fetch(config.baseExpressUrl + 'worker/update/' + id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    worker_name: worker_name
                })
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                if (data.message === 'successful') {
                    tr.querySelector('.worker_name').querySelector('span').innerHTML = worker_name;
                }
            })

        } else if (tr) {
            tr.querySelector('.worker_name').querySelector('span').style.display = 'none';
            tr.querySelector('.worker_name').querySelector('input').type = 'text';
            e.currentTarget.classList.remove('jsgrid-edit-button');
            e.currentTarget.classList.add('jsgrid-update-button');
        }
    }

    async onToggleActive(e, id) {
        await fetch(config.baseExpressUrl + 'worker/toggle-active/' + id);
    }

    async onDelete(e, id) {
        e.currentTarget.closest('tr').remove();
        await fetch(config.baseExpressUrl + 'worker/delete/' + id, {
            method: 'DELETE'
        });
    }

    render() {
        return (
            <div id="jsgrid-basic" data-provide="jsgrid" className="jsgrid"
                 style={{position: 'relative', height: '450px', width: '100%'}}>
                <div className="jsgrid-grid-header jsgrid-header-scrollbar">
                    <table className="jsgrid-table">
                        <thead>
                            <tr className="jsgrid-header-row">
                                <th className="jsgrid-header-cell jsgrid-header-sortable" style={{width: '100px'}}>
                                    Miner Type
                                </th>
                                <th className="jsgrid-header-cell jsgrid-header-sortable" style={{width: '80px'}}>
                                    IP Address
                                </th>
                                <th className="jsgrid-header-cell jsgrid-header-sortable" style={{width: '100px'}}>
                                    Worker Name
                                </th>
                                <th className="jsgrid-header-cell jsgrid-header-sortable" style={{width: '60px'}}>Coin</th>
                                <th className="jsgrid-header-cell jsgrid-align-right jsgrid-header-sortable" style={{width: '100px'}}>
                                    Avg Hashes
                                </th>
                                <th className="jsgrid-header-cell jsgrid-header-sortable" style={{width: '70px'}}>
                                    Age
                                </th>
                                <th className="jsgrid-header-cell jsgrid-header-sortable" style={{width: '50px'}}>
                                    Status
                                </th>
                                <th className="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style={{width: '50px'}}>
                                    Active
                                </th>
                                <th className="jsgrid-header-cell jsgrid-control-field jsgrid-align-center" style={{width: '50px'}}>

                                </th>
                            </tr>
                            <tr className="jsgrid-filter-row" style={{display: 'none'}}>
                                <td className="jsgrid-cell" style={{width: '100px'}}><input type="text"/></td>
                                <td className="jsgrid-cell" style={{width: '80px'}}></td>
                                <td className="jsgrid-cell" style={{width: '100px'}}><input type="text"/></td>
                                <td className="jsgrid-cell" style={{width: '60px'}}><input type="text"/></td>
                                <td className="jsgrid-cell jsgrid-align-right" style={{width: '100px'}}>
                                    <input type="number"/>
                                </td>
                                <td className="jsgrid-cell" style={{width: '70px'}}></td>
                                <td className="jsgrid-cell" style={{width: '50px'}}>
                                    <input type="text"/>
                                </td>
                                <td className="jsgrid-cell jsgrid-align-center" style={{width: '50px'}}>
                                    <input type="checkbox" readOnly=""/>
                                </td>
                                <td className="jsgrid-cell jsgrid-control-field jsgrid-align-center" style={{width: '50px'}}>
                                    <input className="jsgrid-button jsgrid-search-button" type="button" title="Search"/>
                                    <input className="jsgrid-button jsgrid-clear-filter-button" type="button" title="Clear filter"/>
                                </td>
                            </tr>
                            <tr className="jsgrid-insert-row" style={{display: 'none'}}>
                                <td className="jsgrid-cell" style={{width: '100px'}}>
                                    <input type="text"/>
                                </td>
                                <td className="jsgrid-cell" style={{width: '80px'}}></td>
                                <td className="jsgrid-cell" style={{width: '100px'}}>
                                    <input type="text"/>
                                </td>
                                <td className="jsgrid-cell" style={{width: '60px'}}>
                                    <input type="text"/>
                                </td>
                                <td className="jsgrid-cell jsgrid-align-right" style={{width: '100px'}}>
                                    <input type="number"/>
                                </td>
                                <td className="jsgrid-cell" style={{width: '70px'}}></td>
                                <td className="jsgrid-cell" style={{width: '50px'}}>
                                    <input type="text"/>
                                </td>
                                <td className="jsgrid-cell jsgrid-align-center" style={{width: '50px'}}>
                                    <input type="checkbox"/>
                                </td>
                                <td className="jsgrid-cell jsgrid-control-field jsgrid-align-center" style={{width: '50px'}}>
                                    <input className="jsgrid-button jsgrid-insert-button" type="button" title="Insert"/>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="jsgrid-grid-body" style={{height: '363px'}}>
                    <table className="jsgrid-table">
                        <tbody className="ui-sortable">
                        {this.props.asics.map((item, index) => {
                            console.log(item);
                            let statusBadge = <span className="badge badge-primary">New</span>;

                            switch (item.asic.status) {
                                case 1:
                                        statusBadge = <span className="badge badge-primary">New</span>;
                                    break;
                                case 2:
                                        statusBadge = <span className="badge badge-success">Active</span>;
                                    break;
                                case 0:
                                        statusBadge = <span className="badge badge-danger">Not Active</span>;
                                    break;
                            }

                            const mom = moment(item.asic.time_start);

                            return (
                                <tr data-id={item.asic.id} className="jsgrid-row client-0" key={item.id}>
                                    <td className="jsgrid-cell" style={{width: '100px'}}>{item.asic.miner_type}</td>
                                    <td className="jsgrid-cell" style={{width: '80px'}}>{item.asic.ip}</td>
                                    <td className="jsgrid-cell worker_name" style={{width: '100px'}}>
                                        <span>{item.asic.worker_name}</span>
                                        <input type="hidden" defaultValue={item.asic.worker_name} />
                                    </td>
                                    <td className="jsgrid-cell" style={{width: '60px'}}>{item.asic.coin}</td>
                                    <td className="jsgrid-cell jsgrid-align-right" style={{width: '100px'}}>{item.asic.avg_hashes}</td>
                                    <td className="jsgrid-cell" style={{width: '70px'}}>{mom.fromNow()}</td>
                                    <td className="jsgrid-cell" style={{width: '50px'}}>{statusBadge}</td>
                                    <td className="jsgrid-cell jsgrid-align-center" style={{width: '50px'}}>
                                        <input type="checkbox"
                                               onChange={e => this.onToggleActive(e, item.asic.id)}
                                               defaultChecked={item.asic.is_active}
                                        />
                                    </td>
                                    <td className="jsgrid-cell jsgrid-control-field jsgrid-align-center" style={{width: '50px'}}>
                                        <input className="jsgrid-button jsgrid-edit-button"
                                               type="button"
                                               title="Edit"
                                               onClick={e => this.onEdit(e, item.asic.id)}
                                        />
                                        <input className="jsgrid-button jsgrid-delete-button"
                                               type="button"
                                               title="Delete"
                                               onClick={e => this.onDelete(e, item.asic.id)}
                                        />
                                    </td>
                                </tr>
                            )
                        })}

                        </tbody>
                    </table>
                </div>
                {/*<div className="jsgrid-pager-container">*/}
                    {/*<div className="jsgrid-pager">Pages:*/}
                        {/*<span className="jsgrid-pager-nav-button jsgrid-pager-nav-inactive-button">*/}
                            {/*<a href="javascript:void(0);">First</a>*/}
                        {/*</span>*/}
                        {/*<span className="jsgrid-pager-nav-button jsgrid-pager-nav-inactive-button">*/}
                            {/*<a href="javascript:void(0);">Prev</a>*/}
                        {/*</span>*/}
                        {/*<span className="jsgrid-pager-page jsgrid-pager-current-page">1</span>*/}
                        {/*<span className="jsgrid-pager-page">*/}
                            {/*<a href="javascript:void(0);">2</a>*/}
                        {/*</span>*/}
                        {/*<span className="jsgrid-pager-nav-button">*/}
                            {/*<a href="javascript:void(0);">Next</a>*/}
                        {/*</span>*/}
                        {/*<span className="jsgrid-pager-nav-button">*/}
                            {/*<a href="javascript:void(0);">Last</a>*/}
                        {/*</span> &nbsp;&nbsp; 1 of 2*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div className="jsgrid-load-shader" style={{
                    display: 'none',
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                    zIndex: '1000'
                }}></div>
                <div className="jsgrid-load-panel" style={{
                    display: 'none',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    zIndex: '1000'
                }}>
                    Please, wait...
                </div>
            </div>
        )
    }
}




const mapStateToProps = state => ({ asics: state.asics });

export default connect(
    mapStateToProps,
    null
)(withRouter(DashboardTable))
