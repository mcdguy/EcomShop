import React,{useState,useRef} from 'react';
import './login.css';
import { useGlobalContext } from '../../context';
import axios from 'axios';
import {GrClose} from "react-icons/gr";
import {BiLoaderAlt} from "react-icons/bi";

const Login = () => {
    const {setToken,isLoggedIn,setLogin,showLogin,setHideLoginModal}= useGlobalContext();
    const [authType,setAuthType] = useState('login');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState({email: '',password:''});
    const spinnerRef = useRef(null)

    const handleAuth = (e) =>{
        e.preventDefault();
        setError({email: '',password:''});
        if(email===''){
            setError(error => {return({...error,email: 'please enter an email'})});
        }
        if(password === ''){
            setError(error => {return({...error,password: 'please enter a password'})});
            return;
        }
        //only if the fields have something i will show spinner
        spinnerRef.current.classList.add('show');
        axios.post(`/user/${authType}`,{email,password})
        .then(res=>{ 
            console.log(res.data);
            if(spinnerRef.current) spinnerRef.current.classList.remove('show');
            // const user = res.data;
            // console.log(jwt_token);
            // setToken(jwt_token);
            if(res.data.errors){
                setError({email:res.data.errors.email,password: res.data.errors.password});
            }
            if(res.data.success){
                setHideLoginModal();
                //if this is success that means user must have entered valid credentials and jwt is sent back(either he is logged in or he is signed in)
                setLogin();
            }
            //here i would like to do different things depending on the auth type
        })
        .catch(err =>
            {
                if(spinnerRef.current) spinnerRef.current.classList.remove('show');
                console.log(err)
            });
    }
    return (
        <>
            {showLogin === true? 
                <div className="auth_wrapper" onClick={setHideLoginModal}>
                <div className="auth" onClick={e=>e.stopPropagation()}>
                    <div className="auth__close" onClick={setHideLoginModal}><GrClose/></div>
                    <div className="auth__headers">
                        <h1>{`${authType==='login'?'log in': 'sign up'}`}</h1>
                    </div>

                    <div className="auth__form__wrapper">
                        <form className="auth__form" onSubmit={handleAuth}>
                            <div className="auth__field">
                                <input value={email} onChange={e=>{setEmail(e.target.value);setError({email: '',password:''})}} autoComplete="off" type="text" id="email" placeholder="Email"/>
                                <p className="auth__error">{error.email}</p>
                            </div>
                            <div className="auth__field">
                                <input value={password} onChange={e=>{setPassword(e.target.value);setError({email: '',password:''})}} autoComplete="off"  type="password" placeholder="Password"/>
                                <p className="auth__error">{error.password}</p>
                            </div>
                            <button type="submit">{`${authType==='signup'?'sign up': 'login'}`}</button>
                        </form>

                        {authType==='login'?
                            <div className="auth__toggle">
                                <span > <button onClick={()=>setAuthType('signup')}>create an account</button> | <button>forgot password?</button></span>
                                {/* <div>or</div>
                                <div></div> */}
                            </div>
                        :
                            <div className="auth__toggle">
                                <span> <button onClick={()=>setAuthType('login')}>already have an account?</button></span>
                            </div>
                        }
                        <div className="auth__spinner" ref={spinnerRef}><BiLoaderAlt /></div>
                    </div>
                </div>
            </div>
            :null}
        </>
    )
}

export default Login
