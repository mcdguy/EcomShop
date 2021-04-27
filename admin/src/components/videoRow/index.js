import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import DeleteModal from '../deleteModal';

const VideoRow = ({url,title,_id}) => {
    const [showModal,setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    }
    return (
        <tr>
            <td>
                <div>{url}</div>
            </td>
            <td>
                <div>{title}</div>
            </td>
            <td><Link className="btn" to={`/edit/${_id}`}>edit</Link></td>
            <td>
                {showModal && <DeleteModal closeModal={closeModal} source={'gallery'} id={_id}/>}
                <button onClick={()=>setShowModal(true)} className="btn">delete</button>
            </td>
        </tr>
    )
}

export default VideoRow
