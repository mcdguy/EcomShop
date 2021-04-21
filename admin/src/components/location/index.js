import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './location.css';
import LocationRow from '../../components/locationRow';
import { useGlobalContext } from '../../context';

const Location = () => {
    const {location} = useGlobalContext();
    return (
        <div className="read__locations action__read">
            <nav className="locations__nav control__nav">
                <Link to="/create" className="btn">create</Link>
            </nav>
            {location.length?
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
                        {location.map(loc=>{
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
