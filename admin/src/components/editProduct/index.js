import React,{useState,useEffect,useRef} from 'react';
import './editProduct.css';
import axios from 'axios';

const EditProduct = ({id}) => {
    const [product,setProduct] = useState({});
    // const nameRef = useRef(null);
    // const priceRef = useRef(null);
    // const stockRef = useRef(null);
    // const productIdRef = useRef(null);
    // const weightRef = useRef(null);
    // const descRef = useRef(null);
    // const categoryRef = useRef(null);
    // const featuredRef = useRef(null);

    useEffect(()=>{
        let cancel;
        axios(`/product/shop/${id}`,{
            cancelToken: new axios.CancelToken(c=> {cancel =c})
        })
        .then(res =>{
            if(res.data.error) return;
            console.log(res.data);
            setProduct(res.data);
        })
        .catch(err => console.log(err));
        
        return ()=> cancel();
    },[])

    return (
        <div className="edit__products action__edit">
             <nav className="users__nav control__nav">
                {/* <Link to="/create" className="btn">create</Link> */}
            </nav>
            <div className="edit__form">
                <form>
                    <input type="text" defaultValue={product.price}/>
                    <input type="text" defaultValue={product.name}/>
                    <input type="text" defaultValue={product.stock}/>
                    <input type="text" defaultValue={product.productId}/>
                    <input type="text" defaultValue={product.weight}/>
                    <input type="text" defaultValue={product.category}/>
                    <input type="text" defaultValue={product.featured}/>
                    <textarea defaultValue={product.description}/>
                </form>
            </div>
        </div>
    )
}

export default EditProduct
