import React,{useState,useEffect,useRef} from 'react'
import './editLocation.css';
import axios from 'axios';
import Loader from '../loader';
import Error from '../error';
import Alert from '../alert';
import { useGlobalContext,baseUrl } from '../../context';
import ValidateError from '../validateError';
import {handleLocationError} from '../../utils/handleError';

const EditLocation = ({id}) => {
    const {fetchLocation,type} = useGlobalContext();
    const [location,setLocation] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(false);
    const stateRef = useRef(null);
    const addressRef = useRef(null);
    const pinRef = useRef(null);
    const subLocationRef = useRef(null);
    const timingsRef = useRef(null);
    const longitudeRef = useRef(null)
    const latitudeRef = useRef(null);

    const [editError,setEditError] = useState([]);
    const [editLoader,setEditLoader] = useState(false);
    const [alert,setShowAlert] = useState({msg:'',show:false});
    
    const hideAlert = () =>{
        setShowAlert(prev =>{
            return ({...prev,msg:'',show:false});
        })
    }
    useEffect(()=>{ 
        setIsLoading(true);
        setError(false);
        axios(`${baseUrl}/location/${id}`)
            .then(res =>{
                console.log(res.data.location);
                if(res.data.location) setLocation(res.data.location);
                setIsLoading(false);
            })
            .catch(err => {
                setError(true);
                console.log(err)
            });
    },[])

    const editLocation = (e) =>{
        e.preventDefault();
        const error = handleLocationError(stateRef.current.value,addressRef.current.value,pinRef.current.value,subLocationRef.current.value,timingsRef.current.value,longitudeRef.current.value,latitudeRef.current.value);
        if(error.length>0){
            setEditError(error);
            return;
        }
        if(error.length === 0){
            setEditError([]);
        }
        setEditLoader(true);
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
        axios.patch(`${baseUrl}/location/${id}`,newLocation)
            .then(res => {
                if(res.data.success){
                    console.log('location updated');
                    setShowAlert((prev)=>{
                        return ({...prev,msg:res.data.success,show:true});
                    })
                    fetchLocation();
                }
                if(res.data.error){
                    setShowAlert((prev)=>{
                        return ({...prev,msg:res.data.error,show:true});
                    })
                }
                setEditLoader(false);
            })
    }
    if(isLoading){
        return <Loader/>;
    }
    
    if(error){
        return <Error/>;
    }

    if(type === 'read admin'){
        return(
            <div className="action__create">
                <form>
                    <table className="create__location__table">
                        <tbody>
                            <tr>
                                <td>
                                    <div>state</div>
                                </td>
                                <td>
                                    {location.state}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>address</div>
                                </td>
                                <td>
                                    {location.address}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>pin</div>
                                </td>
                                <td>
                                    {location.pin}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>sub location</div>
                                </td>
                                <td>
                                    {location.subLocation}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>timings</div>
                                </td>
                                <td>
                                    {location.timings}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>longitude</div>
                                </td>
                                <td>
                                    {location.geometry && location.geometry.coordinates[0]}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>latitude</div>
                                </td>
                                <td>
                                    {location.geometry && location.geometry.coordinates[1]}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }

    //for other admins
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
                {editError.length?<ValidateError error={editError}/>:null}
                {editLoader?<div className="inline__loader"><Loader/></div>:null}
                {alert.show?<Alert msg={alert.msg} hideAlert={hideAlert}/>:null}
            </div>
        </form>
    </div>
    )
}

export default EditLocation
