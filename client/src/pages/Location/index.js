import React,{useEffect, useState,useRef} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import './location.css';
import axios from 'axios';
// import {Icon} from 'leaflet';
import Loader from '../../components/loader';
import Error from '../../components/error';
// import CoffeeCup from '../../assets/images/coffee_marker2.png'
const Location = () => {
    const [map,setMap] = useState(null);
    const [selectedMarker,setSelectedMarker] = useState(null);
    // const customMarker = new Icon({
    //     iconUrl: CoffeeCup,
    //     iconSize: [46,53]
    // })

    //this ref was to open popup when a location was selected
    // const markerRef = useRef(null)
    const [queryLocation,setQueryLocation] = useState('delhi');
    const [locations, setLocations] = useState([]);
    const [locationStates,setLocationStates] = useState([]);
    const [showDropdown,setShowDropdown] = useState(false);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);

    const handleMarkerClick = (id) =>{
        for(let i=0;i<locations.length;i++){
            if(locations[i]._id === id){
                setSelectedMarker(id);
                if(map){
                    map.flyTo(locations[i].geometry.coordinates,15);
                    break;
                }
            }
        }
    }
    //this can be used to open popup
    // useEffect(()=>{
    //     if(selectedMarker){
    //         markerRef.current.openPopup();
    //     }
    // },[selectedMarker])

    useEffect(()=>{
        setLoading(true);
        setError(false);
        axios(`/location`)
            .then(res =>{
                // console.log(res.data.locations);
                if(res.data.locations){
                    setLocations(res.data.locations);
                    const stateArray = new Set(res.data.locations.map(loc => loc.state));
                    setLocationStates([...stateArray]);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                setError(true);
            });
    },[]);
    
    useEffect(()=>{
        for(let i=0;i<locations.length;i++){
            if(locations[i].state === queryLocation){
                if(map){
                    map.flyTo(locations[i].geometry.coordinates,11);
                    break;
                }
            }
        }
    },[queryLocation,locations]);

    if(loading){
        return <Loader/>
    }
    if(error){
        return <Error/>
    }
    if(!locations.length){
        return null;
    }
    return (
        <div>
            <div className="map__center center">
                <div className="map__info">
                    <div>
                        <div className="custom__select">
                            <div className="custom__select__head" onClick={()=>setShowDropdown(!showDropdown)}>{queryLocation}</div>
                            {showDropdown?<div className="custom__select__options">
                                {locationStates.length?
                                    locationStates.map((state,index)=> <div key={index} onClick={e=>{setQueryLocation(state);setShowDropdown(!showDropdown);}}>{state}</div>)
                                :null}
                            </div>:null}
                        </div>
                        <div className="map__stores">
                            {locations.map(loc=>{
                                if(loc.state === queryLocation){
                                    return(
                                        <div className={`${selectedMarker===loc._id?'location__address selected':'location__address'}`} key={loc._id} onClick={()=>handleMarkerClick(loc._id)}>
                                            <h1 className="loc__head">{loc.subLocation}</h1>
                                            <h4>{loc.timings}</h4>
                                            <p>{loc.address}</p>
                                        </div>
                                    )

                                }
                            })}
                        </div>
                    </div>
                </div>
                <div id="mapid">
                    {locations.length?
                        <MapContainer whenCreated={map=>{setMap(map)}} center={[28.55919136650141, 77.16127199503]} zoom={11}>
                            <TileLayer
                            attribution= '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                            //    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            //    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                               url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                            />
                            {locations.length && locations.map(shop =>{
                                return(
                                    // <Marker icon={customMarker} key={shop._id} position={[shop.geometry.coordinates[0],shop.geometry.coordinates[1]]}>
                                    // <Marker ref={selectedMarker === shop._id?markerRef:null} key={shop._id} position={[shop.geometry.coordinates[0],shop.geometry.coordinates[1]]}>
                                    <Marker key={shop._id} position={[shop.geometry.coordinates[0],shop.geometry.coordinates[1]]}>
                                        <Popup>
                                            <h1>{shop.address}</h1>
                                            <h4>{shop.timings}</h4>
                                        </Popup>
                                    </Marker>
                                )
                            })}
                        </MapContainer>
                    :'no locations available' }
                </div>
            </div>
        </div>
    )
}

export default Location
