import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import DeleteModal from '../deleteModal';
import {formatPrice} from '../../utils/formatPrice';
import { useGlobalContext } from '../../context';

const ProductRow = ({_id,name,price,stock,weight,category}) => {
    const {type} = useGlobalContext();
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
                <div>{formatPrice(price)}</div>
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
                <Link className="btn" to={`edit/${_id}`}>{`${type!=='read admin'?'edit':'show details'}`}</Link>
            </td>
            {type!=='read admin'?<td>
                {showModal && <DeleteModal closeModal={closeModal} source={'product'} id={_id}/>}
                <button onClick={()=>setShowModal(true)} className="btn">delete</button>
            </td>:null}
        </tr>
    )
}

export default ProductRow
