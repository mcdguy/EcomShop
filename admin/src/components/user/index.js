import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';

const User = () => {
    const {user,userHasMore,showNextUserPage} = useGlobalContext();
    // const [filter,setFilter] = useState('username');
    // const [query,setQuery] = useState('');
    // const [filteredUser,setFilteredUser] = useState([]);
    
    // useEffect(()=>{
    //     if(query===''){
    //         setFilteredUser(user);
    //     }
    //     if(filter === 'contact'){
    //         let newUsers = user.filter(u =>{
    //             if(u.address){
    //                 return(u.address.contact.toString().toLowerCase().indexOf(query.toLowerCase())>=0)
    //             }else{
    //                 return false;
    //             }
    //         })
    //         setFilteredUser(newUsers);
    //         return;
    //     }
    //     let newUsers = user.filter(u =>{
    //         return(u[filter].toString().toLowerCase().indexOf(query.toLowerCase())>=0)
    //     })
    //     setFilteredUser(newUsers);
    // },[query,filter])

    return (
        <div className="read__users action__read">
            <nav className="users__nav control__nav">
                {/* <input autoComplete="off" type="text" value={query} onChange={(e)=>setQuery(e.target.value)} name="search" placeholder="search"/>
                <select value={filter} onChange={(e)=>{setFilter(e.target.value)}}>
                    <option value="username">username</option>
                    <option value="email">email</option>
                    <option value="contact">contact</option>
                </select> */}
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
                    {user.map(u=>{
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
                {userHasMore?
                <div className="btn-wrapper">
                    <button onClick={showNextUserPage} className="btn paginate-btn">show more</button>
                </div>
                :
                <div className="btn-wrapper">End of result</div>
                }
              </>  
            :null}
        </div>
    )
}

export default User
