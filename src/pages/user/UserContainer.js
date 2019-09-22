import React from 'react';

export default class UserContainer extends React.Component
{
    render() {
        return (
            <div className="row no-gutters min-h-fullscreen bg-white">
                {this.props.children}
            </div>
        )
    }
}
