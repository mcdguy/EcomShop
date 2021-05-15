import React,{useState,useEffect,useRef} from 'react';
import './editProduct.css';
import axios from 'axios';
import Loader from '../loader';
import Error from '../error';
import Alert from '../alert';
import { useGlobalContext,baseUrl } from '../../context';
import ValidateError from '../validateError';
import {handleProductError} from '../../utils/handleError';
import {formatPrice} from '../../utils/formatPrice';


const EditProduct = ({id}) => {
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(false);
    const {fetchProduct,type} = useGlobalContext();
    
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
    
    const [editError,setEditError] = useState([]);
    const [editLoader,setEditLoader] = useState(false);
    const [alert,setShowAlert] = useState({msg:'',show:false});
    
    const hideAlert = () =>{
        setShowAlert(prev =>{
            return ({...prev,msg:'',show:false});
        })
    }

    useEffect(()=>{
        let cancel;
        setIsLoading(true);
        setError(false)
        axios(`${baseUrl}/product/shop/${id}`,{
            cancelToken: new axios.CancelToken(c=> {cancel =c})
        })
        .then(res =>{
            if(res.data.error) return;
            setProduct(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            if(axios.isCancel(err)) return;
            setError(true);
            console.log(err)
        });
        
        return ()=> cancel();
    },[])

    const editProduct = (e) =>{
        e.preventDefault();

        const error = handleProductError(nameRef.current.value,priceRef.current.value,stockRef.current.value,productIdRef.current.value,weightRef.current.value,descRef.current.value);
        if(error.length>0){
            setEditError(error);
            return;
        }
        if(error.length === 0){
            setEditError([]);
        }

        setEditLoader(true);
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
        axios.patch(`${baseUrl}/product/${product._id}`,data)
        .then(res=>{
            if(res.data.success){
                // console.log('product edited successfully');
                setShowAlert((prev)=>{
                    return ({...prev,msg:res.data.success,show:true});
                })
                fetchProduct();
            }
            if(res.data.error){
                setShowAlert((prev)=>{
                    return ({...prev,msg:res.data.error,show:true});
                })
            }
            setEditLoader(false);
        })
        .catch(err => console.log(err));
    }
    if(isLoading){
        return <Loader/>;
    }
    if(error){
        return <Error/>;
    }
    if(!product) return null;
    
    if(type === 'read admin'){
        return(
            <div className="action__create page">
                <form>
                    <table className="create__location__table">
                    <tbody>
                            <tr>
                                <td>
                                    <div>name</div>
                                </td>
                                <td>
                                    <div>{product.name}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>price</div>
                                </td>
                                <td>
                                    {formatPrice(product.price)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>stock</div>
                                </td>
                                <td>
                                    {product.stock}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>product id</div>
                                </td>
                                <td>
                                    {product.productId}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>weight</div>
                                </td>
                                <td>
                                    {product.weight}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>description</div>
                                </td>
                                <td className="textarea__wrapper">
                                    <div className="read__text">{product.description}</div> 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>category</div>
                                </td>
                                <td>
                                    <div >{product.category}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>featured</div>
                                </td>
                                <td>
                                    <div>{product.featured?'true':'false'}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                        <div className="edit__images">
                            {product.img && product.img.map((img,index)=>{
                                return <div key={index} className="product__edit__img"><img src={`/${img}`} alt=""/></div>
                            })}
                        </div>
                
                </form>
            </div>
        )
    }


    // for other admins
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
                    {editError.length?<ValidateError error={editError}/>:null}
                    {editLoader?<div className="inline__loader"><Loader/></div>:null}
                    {alert.show?<Alert msg={alert.msg} hideAlert={hideAlert}/>:null}
                </div>
            </form>
        </div>
    )
}

export default EditProduct
