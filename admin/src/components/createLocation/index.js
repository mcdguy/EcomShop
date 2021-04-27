import React,{useState} from 'react';
import './createLocation.css';
import axios from 'axios';

const CreateLocation = () => {
    const [location,setLocation] = useState({
        state: '',
        address:'',
        pin:'',
        subLocation:'',
        longitude:'',
        latitude:'',
        timings: ''
    })
    const handleChange = (e) =>{
        setLocation((prevLocation)=>{
            return(
                {...prevLocation,[e.target.name]:e.target.value}
            )
        })
    }
    const createLocation = (e) =>{
        e.preventDefault();
        const newLocation ={
            state: location.state,
            address: location.address,
            pin: location.pin,
            subLocation: location.subLocation,
            timings: location.timings,
            geometry: {
                type: "Point",
                coordinates: [location.longitude,location.latitude]
            }
        }
        axios.post('/location',{location:newLocation})
            .then(res=>{
                if(res.data.success){
                    console.log('location created');
                }
                if(res.data.error){
                    console.log('could not save location');
                }
            })
            .catch(err => console.log({error: 'could not save location'}));
        // console.log(newLocation);
    }
    return (
        <div className="action__create page">
            <form>
                <table className="create__location__table">
                    <tbody>
                        <tr>
                            <td>
                                <div>state</div>
                            </td>
                            <td>
                                <div><input type="text" value={location.state} name="state" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>address</div>
                            </td>
                            <td>
                                <div><input type="text" value={location.address} name="address" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>pin</div>
                            </td>
                            <td>
                                <div><input type="number" value={location.pin} name="pin" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>sub location</div>
                            </td>
                            <td>
                                <div><input type="text" value={location.subLocation} name="subLocation" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>timings</div>
                            </td>
                            <td>
                                <div><input type="text" value={location.timings} name="timings" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>longitude</div>
                            </td>
                            <td>
                                <div><input type="number" value={location.longitude} name="longitude" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>latitude</div>
                            </td>
                            <td>
                                <div><input type="number" value={location.latitude} name="latitude" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn-wrapper">
                    <button onClick={(e)=>createLocation(e)} className="btn">create location</button>
                </div>
            </form>
        </div>
    )
}

export default CreateLocation
