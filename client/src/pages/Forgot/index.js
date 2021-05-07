import React,{useRef,useState} from 'react';
import { useParams } from 'react-router';
import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai";
import './forgot.css';
import axios from 'axios';
import {BiLoaderAlt} from "react-icons/bi";

// import Loader from '../../components/loader';
// import Error from '../../components/error';

const Forgot = () => {
    const {id,token} = useParams();
    const [passwordError,setPasswordError] = useState('');
    const passwordRef = useRef(null);
    const rePasswordRef = useRef(null);
    const spinnerRef = useRef(null)

    //these refs help in changing icon classes 
    const p1Ref = useRef(null);
    const p2Ref = useRef(null)
    const resetPassword = (e) =>{
        setPasswordError('');
        e.preventDefault();
        if(passwordRef.current.value.length === 0 || rePasswordRef.current.value.length === 0){
            setPasswordError('please enter a password');
            return;
        }
        if(passwordRef.current.value !== rePasswordRef.current.value ){
            setPasswordError("password doesn't match");
            return;
        }
        if(passwordRef.current.value.length < 6 || rePasswordRef.current.value.length < 6 ){
            setPasswordError('password too short');
            return;
        }
        spinnerRef.current.classList.add('show');
        axios.post('/user/update-password',{id,token,password: passwordRef.current.value})//sending only one password
            .then(res =>{
                if(res.data.error){
                    if(spinnerRef.current) spinnerRef.current.classList.remove('show');
                    setPasswordError(res.data.error);
                }
                if(res.data.success){
                    setPasswordError(res.data.success);
                    if(spinnerRef.current) spinnerRef.current.classList.remove('show');
                }
            })
            .catch(err => {
                if(spinnerRef.current) spinnerRef.current.classList.remove('show');
                console.log('error');
            });
    }
    
    const changeToText = (field) =>{
        //will check which field i am referring to
        if(field === 'p1'){
            if(passwordRef.current) passwordRef.current.setAttribute('type','text');
            if(p1Ref.current) p1Ref.current.classList.add('visible');
        }
        if(field === 'p2'){
            if(rePasswordRef.current) rePasswordRef.current.setAttribute('type','text');
            if(p1Ref.current) p2Ref.current.classList.add('visible');
        }
    }

    const changeToPassword = (field) =>{
        if(field === 'p1'){
            if(passwordRef.current) passwordRef.current.setAttribute('type','password');
            if(p1Ref.current) p1Ref.current.classList.remove('visible');
        }
        if(field === 'p2'){
            if(rePasswordRef.current) rePasswordRef.current.setAttribute('type','password');
            if(p1Ref.current) p2Ref.current.classList.remove('visible');
        }
    }
    console.log(id,token);
    return (
        <div className="forgot">
            <div className="forgot__center center">
                {/* forgot password form */}
                <div className="forgot__form">
                    <form>
                        <h1>create new password</h1>
                        <div>
                            <div ref={p1Ref} className="input__wrapper">
                                <input onChange={()=>setPasswordError('')} ref={passwordRef} type="password" placeholder="enter new password"/>
                                <AiFillEye onClick={()=>changeToText('p1')} className="show__eye"/>
                                <AiFillEyeInvisible onClick={()=>changeToPassword('p1')} className="hide__eye"/>
                            </div>
                        </div>
                        <div>
                            <div ref={p2Ref} className="input__wrapper">
                                <input onChange={()=>setPasswordError('')} ref={rePasswordRef} type="password" placeholder="re-enter new password"/>
                                <AiFillEye onClick={()=>changeToText('p2')} className="show__eye"/>
                                <AiFillEyeInvisible onClick={()=>changeToPassword('p2')} className="hide__eye"/>
                            </div>
                        </div>
                        {passwordError === ''?null: <p className="forgot__error">{passwordError}</p> }
                        <div className="btn-wrapper"><button  onClick={e=>resetPassword(e)}>change password</button></div>
                    </form>
                    <div className="auth__spinner" ref={spinnerRef}><BiLoaderAlt /></div>
                </div>
            </div>
        </div>
    )
}

export default Forgot
