import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext,baseUrl } from '../../context';
import Loader from '../loader';
import Error from '../error';
import './user.css';
import { useFilterContext } from '../../filterContext';

const User = () => {
    const {user,userHasMore,showNextUserPage,isUserLoading,userError,setIsUserLoading} = useGlobalContext();
    const {userFilter,setUserFilter,userQuery,setUserQuery} = useFilterContext();
    const [filteredUser,setFilteredUser] = useState([]);
    
    useEffect(()=>{
        let cancel;
        if(userQuery===''){
            setFilteredUser(user);
            return;
        }
        setIsUserLoading(true);
        axios.get(`${baseUrl}/user/find-user?filter=${userFilter}&query=${userQuery}`,{
                cancelToken: new axios.CancelToken(c=> {cancel =c})
            })
            .then(res =>{
                if(res.data.user){
                    setFilteredUser(res.data.user);
                }
                setIsUserLoading(false);
            })
            .catch(err => {
                if(axios.isCancel(err)) return;
                console.log(err);
                setIsUserLoading(false);
            })
        return ()=> cancel();
        
    },[userQuery,user,userFilter])
    if(userError){
        return <Error/>
    }

    return (
        <div className="read__users action__read">
            <nav className="users__nav control__nav">
                <div>
                    <input className="search" autoComplete="off" type="text" value={userQuery} onChange={(e)=>setUserQuery(e.target.value)} name="search" placeholder="search"/>
                    <select className="search__options" value={userFilter} onChange={(e)=>{setUserFilter(e.target.value)}}>
                        <option value="username">username</option>
                        <option value="email">email</option>
                        <option value="contact">contact</option>
                        {/* <option value="_id">id</option> */}
                    </select>
                </div>
            </nav>
            {user.length?
            <>
                <table className="read__table">
                    <thead>
                        <tr>
                            <th>
                                <div>id</div>
                            </th>
                            <th>
                                <div>username</div> 
                            </th>
                            <th> 
                                <div>email</div>
                            </th>
                            <th>
                                <div>contact</div>
                            </th>
                            <th className="read__table__show"></th>
                        </tr>  
                    </thead>
                    <tbody>
                    {filteredUser.map(u=>{
                            return(
                                    <tr key={u._id}>
                                        <td>
                                            <div>{u._id}</div>
                                        </td>
                                        <td>
                                            <div>{u.username}</div>
                                        </td>
                                        <td>
                                            <div>{u.email}</div>
                                        </td>
                                        <td>
                                            <div>{u.address?u.address.contact:'N/A'}</div>
                                        </td>
                                        <td><Link to={`/view/${u._id}`} className="btn">show details</Link></td>
                                    </tr>
                            )
                        })}
                    </tbody>
                </table>
                {userHasMore && userQuery == ''?
                    <div className="btn-wrapper">
                        <button onClick={showNextUserPage} className="btn paginate-btn">show more</button>
                    </div>
                    :
                    <div className="btn-wrapper">End of result</div>
                }
              </>  
            :null}
            {isUserLoading?<div className="inline__loader"><Loader/></div>:null}
        </div>
    )
}

export default User
