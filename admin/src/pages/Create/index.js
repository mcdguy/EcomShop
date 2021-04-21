import React from 'react'
import { useGlobalContext } from '../../context'
import CreateLocation from '../../components/createLocation';
import CreateProduct from '../../components/createProduct';
const Create = () => {
    const {currentTab} = useGlobalContext();
    if(currentTab==='product'){
        return(
            <div className="create page">
                <CreateProduct/>
            </div>
        )
    }
    if(currentTab==='location'){
        return(
            <div className="create page">
                <CreateLocation/>
            </div>
        )
    }
}

export default Create
