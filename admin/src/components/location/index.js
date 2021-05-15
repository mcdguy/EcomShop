import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './location.css';
import LocationRow from '../../components/locationRow';
import { useGlobalContext } from '../../context';
import Loader from '../loader';
import Error from '../error';
import { useFilterContext } from '../../filterContext';

const Location = () => {
    const {location,locationError,isLocationLoading,type} = useGlobalContext();
    // const [filter,setFilter] = useState('pin');
    // const [query,setQuery] = useState('');
    const {locationFilter,setLocationFilter,locationQuery,setLocationQuery} = useFilterContext();
    const [filteredLocations,setFilteredLocations] = useState([]);
    useEffect(()=>{
        if(locationQuery === ''){
            // console.log('hello');
            setFilteredLocations(location);
            return;
        }
        let newLocations = location.filter(loc =>{
            return(loc[locationFilter].toString().toLowerCase().indexOf(locationQuery.toLowerCase())>=0)
        })
        setFilteredLocations(newLocations);
    },[locationQuery,location,locationFilter])
        
    if(!location) return null;
    
    if(isLocationLoading){
        return <Loader/>
    }
    if(locationError){
        return <Error/>
    }

    return (
        <div className="read__locations action__read">
            <nav className="locations__nav control__nav">
                <div>
                    <input className="search" autoComplete="off" type="text" value={locationQuery} onChange={(e)=>setLocationQuery(e.target.value)} name="search" placeholder="search"/>
                    <select className="search__options" value={locationFilter} onChange={(e)=>{setLocationFilter(e.target.value)}}>
                        <option value="pin">pin</option>
                        <option value="address">address</option>
                        <option value="state">state</option>
                        <option value="subLocation">sub location</option>
                    </select>
                </div>
                {type!=='read admin'?<Link to="/create" className="btn">create</Link>:null}
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
                            <th className={`${type !== 'read admin'?"read__table__edit":"read__table__show"}`}></th>
                            {type!=='read admin'?<th className="read__table__delete"></th>:null}
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
