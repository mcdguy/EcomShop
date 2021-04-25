import axios from 'axios';
import React,{useState} from 'react';
import './createProduct.css';

const CreateProduct = () => {
    const [product,setProduct] = useState({
        name: '',
        price: '',
        stock: '',
        productId: '',
        weight: 'null',
        description: '',
        category: 'coffee',
        featured: 'true',
    })
    const [images,setImages] = useState();
    const handleImages = (e) =>{
        setImages(e.target.files);
    }
    const handleChange = (e) =>{
        setProduct(oldProduct=>{
            return setProduct({...oldProduct,[e.target.name]: e.target.value});
        });
    }

    const createProduct = (e) =>{
        e.preventDefault();
        if(!images){
            console.log('no images attached');
            return;
        }
        let totalImages = images.length;
        const data = new FormData();
        if(totalImages > 6){
            console.log("can't upload more than 6 images")
            return;
        }
        data.append('name',product.name);
        data.append('price',product.price);
        data.append('stock',product.stock);
        data.append('productId',product.productId);
        data.append('weight',product.weight);
        data.append('description',product.description);
        data.append('category',product.category);
        data.append('featured',product.featured);
        for(let i = 0;i<totalImages;i++){
            data.append('img',images[i]);
        }
        axios.post('/product',data)
            .then(res=>{
                if(res.data.success){
                    console.log('product created successfully');
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
                                <div><input autoComplete="off" type="text" value={product.name} name="name" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>price <span className="product__in__paise">(in paise)</span></div>
                            </td>
                            <td>
                                <div><input autoComplete="off" type="number" value={product.price} name="price" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>stock</div>
                            </td>
                            <td>
                                <div><input autoComplete="off" type="number" value={product.stock} name="stock" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>product id</div>
                            </td>
                            <td>
                                <div><input autoComplete="off" type="text" value={product.productId} name="productId" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>weight</div>
                            </td>
                            <td>
                                <div><input type="text" value={product.weight} name="weight" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>description</div>
                            </td>
                            <td className="textarea__wrapper">
                                <div><textarea autoComplete="off" type="text" value={product.description} name="description" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>category</div>
                            </td>
                            <td>
                                <div className="select__wrapper">
                                    <select className="select" name="category" value={product.category} onChange={(e)=>{handleChange(e)}}>
                                        <option value="coffee">coffee</option>
                                        <option value="brewing equipment">brewing equipment</option>
                                        <option value="accompaniment">accompaniment</option>
                                    </select>
                                    {/* <input type="text" value={product.category} name="category" onChange={(e)=>handleChange(e)}/> */}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>featured</div>
                            </td>
                            <td>
                                <div className="select__wrapper"> 
                                    <select className="select" name="featured" value={product.featured} onChange={(e)=>{handleChange(e)}}>
                                        <option value="true">true</option>
                                        <option value="false">false</option>
                                    </select> 
                                    {/* <input type="text" value={product.featured} name="featured" onChange={(e)=>handleChange(e)}/> */}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>images <span className="product__image__size">(400px by 400px)</span></div>
                            </td>
                            <td>
                                <div><input type="file" multiple onChange={(e)=>handleImages(e)}/></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn-wrapper">
                    <button onClick={(e)=>createProduct(e)} className="btn">create product</button>
                </div>
            </form>
        </div>
    )
}

export default CreateProduct
