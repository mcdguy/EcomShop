import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import DeleteModal from '../deleteModal';

const ProductRow = ({_id,name,price,stock,weight,category}) => {
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
                <div>{name}</div>
            </td>
            <td>
                <div>{price}</div>
            </td>
            <td className="product__table__stock">
                <div>{stock}</div>
            </td>
            <td className="product__table__weight">
                <div>{weight}</div>
            </td>
            <td>
                <div>{category}</div>
            </td>
            <td>
                <Link className="btn" to={`edit/${_id}`}>edit</Link>
            </td>
            <td>
                {showModal && <DeleteModal closeModal={closeModal} source={'product'} id={_id}/>}
                <button onClick={()=>setShowModal(true)} className="btn">delete</button>
            </td>
        </tr>
    )
}

export default ProductRow
