import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';

const User = () => {
    const {user} = useGlobalContext();
    return (
        <div className="read__users action__read">
            <nav className="users__nav control__nav">
                {/* <Link to="/create" className="btn">create</Link> */}
            </nav>
            {user.length?
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
            :null}
        </div>
    )
}

export default User
