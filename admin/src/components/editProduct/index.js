import React,{useState,useEffect,useRef} from 'react';
import './editProduct.css';
import axios from 'axios';

const EditProduct = ({id}) => {
    const [product,setProduct] = useState();
    const [images,setImages] = useState();
    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const stockRef = useRef(null);
    const productIdRef = useRef(null);
    const weightRef = useRef(null);
    const descRef = useRef(null);
    const categoryRef = useRef(null);
    const featuredRef = useRef(null);

    useEffect(()=>{
        let cancel;
        axios(`/product/shop/${id}`,{
            cancelToken: new axios.CancelToken(c=> {cancel =c})
        })
        .then(res =>{
            if(res.data.error) return;
            setProduct(res.data);
        })
        .catch(err => console.log(err));
        
        return ()=> cancel();
    },[])

    const editProduct = (e) =>{
        e.preventDefault();
        const data = new FormData();
        data.append('name',nameRef.current.value);
        data.append('price',priceRef.current.value);
        data.append('stock',stockRef.current.value);
        data.append('productId',productIdRef.current.value);
        data.append('weight',weightRef.current.value);
        data.append('description',descRef.current.value);
        data.append('category',categoryRef.current.value);
        data.append('featured',featuredRef.current.value);
        
        if(images){
            let totalImages = images.length;
            if(totalImages > 6){
                console.log("can't upload more than 6 images")
                return;
            }
            for(let i = 0;i<totalImages;i++){
                data.append('img',images[i]);
            }
        }
        axios.patch(`/product/${product._id}`,data)
        .then(res=>{
            if(res.data.success){
                console.log('product edited successfully');
            }
        })
        .catch(err => console.log(err));
    }
    if(!product) return null;
    return (
        <div className="action__create page">
            <form>
                <table className="create__location__table">
                <tbody>
                        <tr>
                            <td>
                                <div>name</div>
                            </td>
                            <td>
                                <div><input autoComplete="off" type="text" defaultValue={product.name} name="name" ref={nameRef}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>price <span className="product__in__paise">(in paise)</span></div>
                            </td>
                            <td>
                                <div><input autoComplete="off" type="number" defaultValue={product.price} name="price" ref={priceRef}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>stock</div>
                            </td>
                            <td>
                                <div><input autoComplete="off" type="number" defaultValue={product.stock} name="stock" ref={stockRef}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>product id</div>
                            </td>
                            <td>
                                <div><input autoComplete="off" type="text" defaultValue={product.productId} name="productId" ref={productIdRef}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>weight</div>
                            </td>
                            <td>
                                <div><input type="text" defaultValue={product.weight} name="weight" ref={weightRef}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>description</div>
                            </td>
                            <td className="textarea__wrapper">
                                <div><textarea autoComplete="off" type="text" defaultValue={product.description} name="description" ref={descRef}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>category</div>
                            </td>
                            <td>
                                <div className="select__wrapper">
                                    <select className="select" name="category" defaultValue={product.category} ref={categoryRef}>
                                        <option value="coffee">coffee</option>
                                        <option value="brewing equipment">brewing equipment</option>
                                        <option value="accompaniment">accompaniment</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>featured</div>
                            </td>
                            <td>
                                <div className="select__wrapper"> 
                                    <select className="select" name="featured" defaultValue={product.featured} ref={featuredRef}>
                                        <option value="true">true</option>
                                        <option value="false">false</option>
                                    </select> 
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>images <span className="product__image__size">(400px by 400px)</span></div>
                            </td>
                            <td>
                                <div><input type="file" onChange={(e)=>setImages(e.target.files)} multiple /></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                    <div className="edit__images">
                        {product.img && product.img.map((img,index)=>{
                            return <div key={index} className="product__edit__img"><img src={`/${img}`} alt=""/></div>
                        })}
                    </div>
                <div className="btn-wrapper">
                    <button onClick={(e)=>editProduct(e)} className="btn">edit product</button>
                </div>
            </form>
        </div>
    )
}

export default EditProduct
