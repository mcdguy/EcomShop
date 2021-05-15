import React from 'react'
import { useParams,Redirect } from 'react-router'
import { useGlobalContext } from '../../context';
import ViewUser from '../../components/viewUser';
import ViewOrder from '../../components/viewOrder';

const View = () => {
    const {id} = useParams();
    const {currentTab,isLoggedIn} = useGlobalContext();
    if(!isLoggedIn){
        return <Redirect to ="/login"></Redirect>
    }
    if(currentTab === 'user'){
        return (
            <div className="view page">
                <ViewUser id={id}/>
            </div>
        )
    }
    if(currentTab === 'order'){
        return (
            <div className="view page">
                <ViewOrder id={id}/>
            </div>
        )
    }
    return null;
}

export default View
