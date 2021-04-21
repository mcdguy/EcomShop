import React,{useState,useEffect} from 'react'
import './editLocation.css';
import axios from 'axios';

const EditLocation = ({id}) => {
    const [location,setLocation] = useState({});
    useEffect(()=>{ 
        axios(`/location/${id}`)
        .then(res =>{
            console.log(res.data);
            setLocation(res.data);
    })
    .catch(err => console.log(err));})
    return (
        <div className="edit__locations action__edit">
             <nav className="users__nav control__nav">
                {/* <Link to="/create" className="btn">create</Link> */}
            </nav>
            <div className="edit__form">
                <form>
                    <input type="text" defaultValue={location.state}/>
                    <input type="text" defaultValue={location.address}/>
                    <input type="text" defaultValue={location.pin}/>
                    <input type="text" defaultValue={location.subLocation}/>
                    <input type="text" defaultValue={location.geometry && location.geometry.coordinates[0]}/>
                    <input type="text" defaultValue={location.geometry && location.geometry.coordinates[1]}/>
                    <input type="text" defaultValue={location.timings}/>
                </form>
            </div>
        </div>
    )
}

export default EditLocation
