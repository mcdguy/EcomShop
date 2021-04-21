import React from 'react';
import { useParams } from 'react-router';
import { useGlobalContext } from '../../context';
import './edit.css';
import EditLocation from '../../components/editLocation';
import EditProduct from '../../components/editProduct';

const Edit = () => {
    const {id} = useParams();
    const {currentTab} = useGlobalContext();
    if(currentTab === 'product'){
    return(
        <div className="edit page">
            <EditProduct id={id}/>
        </div>
     )
    }
    if(currentTab === 'location'){
        return(
            <div className="edit page">
            <EditLocation id={id}/>
        </div>
     )
    }
    
}

export default Edit
