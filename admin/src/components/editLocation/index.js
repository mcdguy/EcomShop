import React,{useState,useEffect,useRef} from 'react'
import './editLocation.css';
import axios from 'axios';

const EditLocation = ({id}) => {
    const [location,setLocation] = useState({});
    const stateRef = useRef(null);
    const addressRef = useRef(null);
    const pinRef = useRef(null);
    const subLocationRef = useRef(null);
    const timingsRef = useRef(null);
    const longitudeRef = useRef(null)
    const latitudeRef = useRef(null);
    useEffect(()=>{ 
        axios(`/location/${id}`)
        .then(res =>{
            console.log(res.data.location);
            if(res.data.location) setLocation(res.data.location);
    })
    .catch(err => console.log(err));
    },[])

    const editLocation = (e) =>{
        e.preventDefault();
        const newLocation = {
            state: stateRef.current.value,
            address: addressRef.current.value,
            pin: pinRef.current.value,
            subLocation:subLocationRef.current.value,
            timings: timingsRef.current.value,
            geometry:{
                type: "Point",
                coordinates:[longitudeRef.current.value,latitudeRef.current.value]
            }
        }
        axios.patch(`/location/${id}`,newLocation)
            .then(res => {
                if(res.data.success){
                    console.log('location updated');
                }
            })
    }
    return (
        <div className="action__create">
        <form>
            <table className="create__location__table">
                <tbody>
                    <tr>
                        <td>
                            <div>state</div>
                        </td>
                        <td>
                            <div><input type="text" ref={stateRef} defaultValue={location.state} name="state"/></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>address</div>
                        </td>
                        <td>
                            <div><input type="text" ref={addressRef} defaultValue={location.address} name="address"/></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>pin</div>
                        </td>
                        <td>
                            <div><input type="number" ref={pinRef} defaultValue={location.pin} name="pin"/></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>sub location</div>
                        </td>
                        <td>
                            <div><input type="text" ref={subLocationRef} defaultValue={location.subLocation} name="subLocation"/></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>timings</div>
                        </td>
                        <td>
                            <div><input type="text" ref={timingsRef} defaultValue={location.timings} name="timings"/></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>longitude</div>
                        </td>
                        <td>
                            <div><input type="number" ref={longitudeRef} defaultValue={location.geometry && location.geometry.coordinates[0]} name="longitude"/></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>latitude</div>
                        </td>
                        <td>
                            <div><input type="number" ref={latitudeRef} defaultValue={location.geometry && location.geometry.coordinates[1]} name="latitude"/></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="btn-wrapper">
                <button onClick={(e)=>editLocation(e)} className="btn">edit location</button>
            </div>
        </form>
    </div>
    )
}

export default EditLocation
