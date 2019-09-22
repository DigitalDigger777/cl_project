import React from 'react';
import PreloaderSpinner from "../components/PreloaderSpinner";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";


export default class PageContainer extends React.Component {
    render() {
        return (
            <div>
                {/*<PreloaderSpinner/>*/}
                <Sidebar/>
                <Topbar/>
                {this.props.children}
            </div>
        )
    }
}
