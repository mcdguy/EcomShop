import React,{useEffect} from 'react';
import './alert.css';
const Alert = ({msg,hideAlert}) => {
    useEffect(()=>{
        let x =setTimeout(()=>{
            hideAlert();
        },3000);
        return () => clearInterval(x);
    },[]);

    return (
        <div className="inline__alert">
            <span>{msg}</span>
        </div>
    )
}

export default Alert;
