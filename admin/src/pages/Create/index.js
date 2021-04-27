import React from 'react'
import { useGlobalContext } from '../../context'
import CreateLocation from '../../components/createLocation';
import CreateProduct from '../../components/createProduct';
import CreateCoupon from '../../components/createCoupon';
import CreateVideo from '../../components/createVideo';
const Create = () => {
    const {currentTab} = useGlobalContext();
    if(currentTab === 'product'){
        return(
            <div className="create page">
                <CreateProduct/>
            </div>
        )
    }
    if(currentTab ===  'location'){
        return(
            <div className="create page">
                <CreateLocation/>
            </div>
        )
    }
    if(currentTab === 'coupon'){
        return(
            <div className="create page">
                <CreateCoupon/>
            </div>
        )
    }
    if(currentTab === 'gallery'){
        return(
            <div className="create page">
                <CreateVideo/>
            </div>
        )
    }
    return null;
}

export default Create
