import axios from 'axios';
import React, {useState,useEffect} from 'react'
import './viewUser.css';
import Loader from '../loader';
import Error from '../error';

const ViewUser = ({id}) => {
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(false);

    const [user,setUser] = useState(null);
    useEffect(()=>{
        setIsLoading(true);
        setError(false);
        axios.get(`/user/find/${id}`)
            .then(res=>{
                if(res.data.user){
                    setUser(res.data.user);
                    setIsLoading(false);
                }
                if(res.data.error){
                    setError(true);
                    console.log(res.data.error);
                }
            })
    },[]);

    if(isLoading){
        return <Loader/>;
    }
    
    if(error){
        return <Error/>;
    }
    
    if(!user) return null;

    return (
        <div className="view__user">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div>username</div>
                        </td>
                        <td>
                            <div>{user.username}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>email</div>
                        </td>
                        <td>
                            <div>{user.email}</div>
                        </td>
                    </tr>
                    {user.address?
                        <>
                            <tr>
                                <td>
                                    <div>street</div>
                                </td>
                                <td>
                                    <div>{user.address.addressLine}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>state</div>
                                </td>
                                <td>
                                    <div>{user.address.state}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>city</div>
                                </td>
                                <td>
                                    <div>{user.address.city}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>pin</div>
                                </td>
                                <td>
                                    <div>{user.address.pin}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>contact</div>
                                </td>
                                <td>
                                    <div>{user.address.contact}</div>
                                </td>
                            </tr>
                        </>
                    :null}
                </tbody>
            </table>
            {/* <h1>{user.email}</h1>
            <h1>{user.username}</h1>
            {user.address?
                <>
                    <div>{user.address.addressLine}</div>
                    <div>{user.address.state}</div>
                    <div>{user.address.city}</div>
                    <div>{user.address.pin}</div>
                    <div>{user.address.contact}</div>
                </>
            :<div>no address saved</div>} */}
        </div>
    )
}

export default ViewUser
