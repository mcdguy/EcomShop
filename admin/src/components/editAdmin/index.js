import React,{useState,useEffect,useRef} from 'react'
import { useGlobalContext,baseUrl } from '../../context'
import Loader from '../loader';
import Error from '../error';
import axios from 'axios';
import Alert from '../alert';
import ValidateError from '../validateError';

const EditAdmin = ({id}) => {
    const {fetchAdmin} = useGlobalContext();
    const [admin,setAdmin] = useState({});
    // const roleRef = useRef(null);
    //for main loader
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(false);

    //when edit is clicked loader
    const [editError,setEditError] = useState([]);
    const [editLoader,setEditLoader] = useState(false);
    const [alert,setShowAlert] = useState({msg:'',show:false});
    
    const hideAlert = () =>{
        setShowAlert(prev =>{
            return ({...prev,msg:'',show:false});
        })
    }

    const editAdmin = (e) =>{
        e.preventDefault();
        setEditLoader(true);
        console.log(admin.role);
        axios.patch(`${baseUrl}/admin/edit-role/${id}`,{role: admin.role})
            .then(res =>{
                if(res.data.success){
                    setShowAlert((prev)=>{
                        return ({...prev,msg:res.data.success,show:true});
                    })
                    fetchAdmin();
                }
                if(res.data.error){
                    setShowAlert((prev)=>{
                        return ({...prev,msg:res.data.error,show:true});
                    })
                }
                setEditLoader(false);
            })
            .catch(err => console.log({error: 'an error occurred'}));
    }
    useEffect(()=>{
        setIsLoading(true);
        setError(false);
        axios.get(`${baseUrl}/admin/find/${id}`)
            .then(res=>{
                if(res.data.admin){
                    setIsLoading(false);
                    setAdmin(res.data.admin);
                }
            })
            .catch(err =>{
                console.log(err);
                setError(true);
            })
    },[])

    if(isLoading){
        return <Loader/>;
    }
    
    if(error){
        return <Error/>;
    }

    return (
        <div className="action__create">
            <form>
                <table className="create__location__table">
                    <tbody>
                        <tr>
                            <td>
                                <div>name</div>
                            </td>
                            <td>
                                <div>
                                    {admin.name}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>email</div>
                            </td>
                            <td>
                                <div>
                                    {admin.email}
                                </div>
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
                    <button onClick={(e)=>editAdmin(e)} className="btn">edit admin</button>
                    {editError.length?<ValidateError error={editError}/>:null}
                    {editLoader?<div className="inline__loader"><Loader/></div>:null}
                    {alert.show?<Alert msg={alert.msg} hideAlert={hideAlert}/>:null}
                </div>
            </form>
        </div>
    )
}

export default EditAdmin
