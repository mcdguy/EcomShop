import React,{useEffect} from 'react';
import './alert.css';
import {GrClose} from "react-icons/gr";

const Alert = ({message,setShowAlert}) => {
    useEffect(()=>{
        let x = setTimeout(()=>{
            setShowAlert(false);
        },2000);
        return ()=>clearTimeout(x);
    },[]);
    return (
        <div className="alert_wrapper">
            <div className="alert">
            <GrClose onClick={()=>setShowAlert(false)}/>
                {message}
            </div>
        </div>
    )
}

export default Alert
