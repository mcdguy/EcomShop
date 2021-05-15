import React from 'react';
import './validateError.css';

const ValidateError = ({error}) => {
    return (
        <div className="validate__errors__wrapper">
            <ul>
                {error.map((e,index)=>{
                    return (<li key={index}>{e}</li>);
                })}
            </ul>
        </div>
    )
}

export default ValidateError
