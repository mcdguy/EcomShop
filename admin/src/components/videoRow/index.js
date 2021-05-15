import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import DeleteModal from '../deleteModal';

const VideoRow = ({url,title,_id}) => {
    const {type} = useGlobalContext();
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
            {type!=='read admin'?<td><Link className="btn" to={`/edit/${_id}`}>edit</Link></td>:null}
            {type!=='read admin'?<td>
                {showModal && <DeleteModal closeModal={closeModal} source={'gallery'} id={_id}/>}
                <button onClick={()=>setShowModal(true)} className="btn">delete</button>
            </td>:null}
        </tr>
    )
}

export default VideoRow
