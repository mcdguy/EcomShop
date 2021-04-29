import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './location.css';
import LocationRow from '../../components/locationRow';
import { useGlobalContext } from '../../context';

const Location = () => {
    const {location} = useGlobalContext();
    const [filter,setFilter] = useState('pin');
    const [query,setQuery] = useState('');
    const [filteredLocations,setFilteredLocations] = useState([]);
    useEffect(()=>{
        if(query===''){
            console.log('hello');
            setFilteredLocations(location);
        }
        let newLocations = location.filter(loc =>{
            return(loc[filter].toString().toLowerCase().indexOf(query.toLowerCase())>=0)
        })
        setFilteredLocations(newLocations);
    },[query,location])
        
    if(!location) return null;
    return (
        <div className="read__locations action__read">
            <nav className="locations__nav control__nav">
                <Link to="/create" className="btn">create</Link>
                <input autoComplete="off" type="text" value={query} onChange={(e)=>setQuery(e.target.value)} name="search" placeholder="search"/>
                <select value={filter} onChange={(e)=>{setFilter(e.target.value)}}>
                    <option value="pin">pin</option>
                    <option value="address">address</option>
                    <option value="state">state</option>
                    <option value="subLocation">sub location</option>
                </select>
            </nav>
            {filteredLocations.length?
                <table className="read__table">
                    <thead>
                        <tr>
                            <th>
                                <div>
                                    id
                                </div>
                            </th>
                            <th>
                                <div>
                                    pin
                                </div>
                            </th>
                            <th>
                                <div>
                                    state
                                </div>
                            </th>
                            <th>
                                <div>
                                    timings
                                </div>
                            </th>
                            <th className="read__table__edit"></th>
                            <th className="read__table__delete"></th>
                        </tr>

                    </thead>
                    <tbody >
                        {filteredLocations
                            .map(loc=>{
                                return(
                                    <LocationRow key={loc._id} {...loc}/>
                                )
                        })}
                    </tbody>
                </table>
            :null}
        </div>
    )
}

export default Location;
