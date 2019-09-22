import React from 'react';

import { Route,  Switch } from "react-router-dom";
import {connect} from 'react-redux';
import axios from 'axios';


import About from './pages/About';
import Home from './pages/Home';
import Logs from './pages/Logs';
import Network from './pages/Network';
import Settings from './pages/Settings';

import UserLogin from './pages/user/Login';
import UserLocked from './pages/user/Locked';
import UserPassword from './pages/user/Password';
import {config} from "./config";

function App() {
    const loadSetting = async () => {
        const token = window.localStorage.getItem('token');

        if (!token) {
            fetch(config.baseExpressUrl + 'hlor/user-info?token=' + token, {
                method: 'GET'
            }).then(response => {
                return response.json();
            }).then(async data => {
                await fetch(config.baseExpressUrl + 'setting/save', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            }).catch(err => {
                window.location = '/login';
            });
        }
    };

    if (window.location.pathname !== '/login') {
        loadSetting();
    }

    const  botService = async () => {

        // get ip list
        const ipList = await fetch(config.baseExpressUrl + 'worker/list').then(response => {
            return response.json();
        });

        for(let i = 0; i < ipList.length; i++) {
            console.log(ipList);
            const res = await fetch(config.baseExpressUrl + 'worker/check-active-ip', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ip: ipList[i].ip})
            }).then(response => {
                return response.json();
            });

            console.log(res);

            // if asic active
            if (res.isActive) {

                // init worker
                const initRes = await fetch(config.baseExpressUrl + 'worker/init', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: ipList[i].id})
                }).then(response => {
                    return response.json();
                });

                console.log(initRes);

                const sendHashRes = await fetch(config.baseExpressUrl + 'hlor/send-hash', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: ipList[i].id})
                }).then(response => {
                    return response.json();
                });

                console.log(sendHashRes);

                const updateHashRes = await fetch(config.baseExpressUrl + 'worker/update-hash', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: ipList[i].id})
                }).then(response => {
                    return response.json();
                });

                console.log(updateHashRes);
            }
        }

        // check active for each ip
        // calculate hash
        // send hash
    };

    setInterval(async function () {
        await botService();
    }, 30000);

    return (

            <Switch>
                <Route exact path="/dashboard" component={Home} />
                <Route path="/network" component={Network} />
                <Route path="/logs" component={Logs} />
                <Route path="/settings" component={Settings} />
                <Route path="/about" component={About} />

                <Route path="/" component={UserLogin}/>
                <Route path="/login" component={UserLogin}/>
                <Route path="/locked" component={UserLocked}/>
                <Route path="/password" component={UserPassword}/>
            </Switch>

    );
}

export default App;
