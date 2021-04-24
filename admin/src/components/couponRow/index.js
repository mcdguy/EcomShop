import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import DeleteModal from '../deleteModal';

const CouponRow = ({_id,code,discount}) => {
    const [showModal,setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    }
    return (
        <tr>
            <td>
                <div>{_id}</div>
            </td>
            <td>
                <div>{code}</div>
            </td>
            <td>
                <div>{discount}</div>
            </td>
            <td><Link className="btn" to={`/edit/${_id}`}>edit</Link></td>
            <td>
                {showModal && <DeleteModal closeModal={closeModal} source={'coupon'} id={_id}/>}
                <button onClick={()=>setShowModal(true)} className="btn">delete</button>
            </td>
        </tr>
    )
}

export default CouponRow
