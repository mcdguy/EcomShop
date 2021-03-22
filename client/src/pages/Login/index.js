import React,{useState} from 'react';
import './login.css';
import axios from 'axios';

const SignUp = () => {
    const [authType,setAuthType] = useState('login');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const handleAuth = (e) =>{
        e.preventDefault();
        // axios.post(`/${authType}`,{})
    }
    return (
        <div className="auth">
            <div className="auth__center center">
                <div className="auth__container">
                    <div className="auth__headers">
                        <h1>{`${authType==='login'?'log in': 'sign up'}`}</h1>
                    </div>
                    <div className="auth__form__wrapper">
                        <form className="auth__form" onClick={handleAuth}>
                            <input value={email} onChange={e=>setEmail(e.target.value)} autocomplete="off" type="text" id="email" placeholder="Email"/>
                            <input value={password} onChange={e=>setPassword(e.target.value)} autocomplete="off"  type="password" placeholder="Password"/>
                            <button type="submit">{`${authType==='signup'?'sign up': 'login'}`}</button>
                        </form>

                        {authType==='login'?
                            <div className="auth__toggle">
                                <span > <button onClick={()=>setAuthType('signup')}>create an account</button> | <button>forgot password?</button></span>
                            </div>
                        :
                            <div className="auth__toggle">
                                <span> <button onClick={()=>setAuthType('login')}>already have an account?</button></span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SignUp
