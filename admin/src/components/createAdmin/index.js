import React,{useState} from 'react'
import { useGlobalContext,baseUrl } from '../../context'
import './createAdmin.css';
import axios from 'axios';
import Alert from '../alert';
import Loader from '../loader';
import ValidateError from '../validateError';
import {handleAdminError} from '../../utils/handleError';

const CreateAdmin = () => {
    const {fetchAdmin} = useGlobalContext();
    const [admin,setAdmin] = useState({
        name: '',
        email: '',
        role: 'admin',
        password: ''
    })

    const [createError,setCreateError] = useState([]);
    const [createLoader,setCreateLoader] = useState(false);
    const [alert,setShowAlert] = useState({msg:'',show:false});
    
    const handleChange = (e) =>{
        setAdmin((prevAdmin)=>{
            return(
                {...prevAdmin,[e.target.name]:e.target.value}
            )
        })
    }
    
    const hideAlert = () =>{
        setShowAlert(prev =>{
            return ({...prev,msg:'',show:false});
        })
    }

    const createAdmin = (e) =>{
        e.preventDefault();
        const error = handleAdminError(admin.name,admin.email,admin.role,admin.password);
        if(error.length>0){
            setCreateError(error);
            return;
        }
        if(error.length === 0){
            setCreateError([]);
        }
        setCreateLoader(true);
        axios.post(`${baseUrl}/admin`,{email:admin.email,password:admin.password,role:admin.role,name:admin.name})
            .then(res=>{
                if(res.data.success){
                    console.log('admin created');
                    setShowAlert((prev)=>{
                        return ({...prev,msg:res.data.success,show:true});
                    })
                    fetchAdmin();
                }
                console.log(res.data);
                if(res.data.error){
                    setShowAlert((prev)=>{
                        return ({...prev,msg:res.data.error,show:true});
                    })
                }
                setCreateLoader(false);
            })
            .catch(err => console.log({error: 'could not create admin'}));
    }
    return (
        <div className="action__create page">
            <form>
                <table className="create__location__table">
                    <tbody>
                        <tr>
                            <td>
                                <div>name</div>
                            </td>
                            <td>
                                <div><input autoComplete="off" type="text" value={admin.name} name="name" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>email</div>
                            </td>
                            <td>
                                <div><input autoComplete="off" type="text" value={admin.email} name="email" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>password</div>
                            </td>
                            <td>
                                <div><input autoComplete="off" type="text" value={admin.password} name="password" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>type</div>
                            </td>
                            <td>
                                <div className="select__wrapper">
                                    <select className="select" value={admin.role}  onChange={(e)=>{setAdmin(adm=>{return({...adm,role:e.target.value})})}}>
                                        <option value="admin">admin</option>
                                        <option value="read admin">read admin</option>
                                        <option value="edit admin">edit admin</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn-wrapper">
                    <button onClick={(e)=>createAdmin(e)} className="btn">create admin</button>
                    {createError.length?<ValidateError error={createError}/>:null}
                    {createLoader?<div className="inline__loader"><Loader/></div>:null}
                    {alert.show?<Alert msg={alert.msg} hideAlert={hideAlert}/>:null}
                </div>
            </form>
        </div>
    )
}

export default CreateAdmin
