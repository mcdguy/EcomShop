import React from 'react';
import './error.css';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="error">
            <div className="error__wrapper center">
                <div className="error__info">
                    <h1>page</h1>
                    <h1>not </h1>
                    <h1>found</h1>
                </div>      
                <Link className="home__btn error__btn" to="/">Back To Home</Link>
                {/* <Link className="error__btn btn" to="/">Back To Home</Link> */}
            </div>
        </div>
    )
}

export default Error;
