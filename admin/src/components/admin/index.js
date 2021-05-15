import React,{useState,useEffect} from 'react'
import { useGlobalContext } from '../../context'
import { useFilterContext } from '../../filterContext';
import Loader from '../loader';
import Error from '../error';
import { Link } from 'react-router-dom';
import AdminRow from '../adminRow';

const Admin = () => {
    const {admin,adminError,isAdminLoading} = useGlobalContext();
    const {adminFilter,setAdminFilter,adminQuery,setAdminQuery} = useFilterContext();
    const [filteredAdmin,setFilteredAdmin] = useState([]);
    useEffect(()=>{
        if(adminQuery === ''){
            setFilteredAdmin(admin);
            return;
        }
        let newAdmins = admin.filter(a=>{
            return (a[adminFilter].toString().toLowerCase().indexOf(adminQuery.toLowerCase())>=0);
        })
        setFilteredAdmin(newAdmins);
    },[adminQuery,admin,adminFilter]);

    if(!admin) return null;
    
    if(isAdminLoading){
        return <Loader/>
    }
    if(adminError){
        return <Error/>
    }
    return (
        <div className="read__locations action__read">
            <nav className="locations__nav control__nav">
                <div>
                    <input className="search" autoComplete="off" type="text" value={adminQuery} onChange={(e)=>setAdminQuery(e.target.value)} name="search" placeholder="search"/>
                    <select className="search__options" value={adminFilter} onChange={(e)=>{setAdminFilter(e.target.value)}}>
                        <option value="name">name</option>
                        <option value="email">email</option>
                        <option value="role">type</option>
                    </select>
                </div>
                <Link to="/create" className="btn">create</Link>
            </nav>
            {filteredAdmin.length?
                <table className="read__table">
                    <thead>
                        <tr>
                            <th>
                                <div>
                                    name
                                </div>
                            </th>
                            <th>
                                <div>
                                    email
                                </div>
                            </th>
                            <th>
                                <div>
                                    type
                                </div>
                            </th>
                            <th className="read__table__edit"></th>
                            <th className="read__table__delete"></th>
                        </tr>

                    </thead>
                    <tbody >
                        {filteredAdmin
                            .map(a=>{
                                return(
                                    <AdminRow key={a._id} {...a}/>
                                )
                        })}
                    </tbody>
                </table>
            :null}
        </div>
    )
}

export default Admin
