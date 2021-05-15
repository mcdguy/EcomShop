import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import DeleteModal from '../deleteModal';
//creating the row seperately because it was hard to set seperate showModal state for each row in location.js

const LocationRow = ({_id,pin,state,timings}) => {
    const {type} = useGlobalContext();
    const [showModal,setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    }
    return (
        <tr>
            <td>
                <div>
                    {_id}
                </div>
            </td>
            <td>
                <div>
                    {pin}
                </div>
            </td>
            <td>
                <div>
                    {state}
                </div>
            </td>
            <td>
                <div>
                    {timings}
                </div>
            </td>
            <td><Link className="btn" to={`/edit/${_id}`}>{`${type!=='read admin'?'edit':'show details'}`}</Link></td>
            {type!=='read admin'?<td>
                {showModal && <DeleteModal closeModal={closeModal} source={'location'} id={_id}/>}
                <button onClick={()=>setShowModal(true)} className="btn">delete</button>
            </td>:null}
        </tr>
    )
}

export default LocationRow
