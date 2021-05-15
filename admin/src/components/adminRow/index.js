import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import DeleteModal from '../deleteModal';

const AdminRow = ({_id,name,email,role}) => {
    const [showModal,setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <tr>
        <td>
            <div>{name}</div>
        </td>
        <td>
            <div>{email}</div>
        </td>
        <td>
            <div>{role}</div>
        </td>
        <td><Link className="btn" to={`/edit/${_id}`}>edit</Link></td>
        <td>
            {showModal && <DeleteModal closeModal={closeModal} source={'admin'} id={_id}/>}
            <button onClick={()=>setShowModal(true)} className="btn">delete</button>
        </td>
    </tr>
    )
}

export default AdminRow;
