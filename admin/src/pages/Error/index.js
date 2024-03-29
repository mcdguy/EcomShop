import React from 'react';
import './error.css';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="error">
            <div className="error__wrapper center">
                <h1>page not found</h1>
                <div className="btn-wrapper">
                    <Link className="btn" to="/">Back To Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Error;
