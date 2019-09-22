import React from 'react';

export default class PreloaderSpinner extends React.Component
{
    render() {
        return (
            // Preloader
            <div className="preloader">
                <div className="spinner-dots">
                    <span className="dot1"></span>
                    <span className="dot2"></span>
                    <span className="dot3"></span>
                </div>
            </div>
            // END Preloader
        )
    }
}
