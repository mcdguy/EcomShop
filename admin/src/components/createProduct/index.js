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
        category: '',
        featured: '',
        images: '',
    })
    const handleChange = (e) =>{

    }
    return (
        <div className="action__create">
            <form>
                <table className="create__location__table">
                <tbody>
                        <tr>
                            <td>
                                <div>name</div>
                            </td>
                            <td>
                                <div><input type="text" value={product.name} name="name" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>price</div>
                            </td>
                            <td>
                                <div><input type="number" value={product.price} name="price" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>stock</div>
                            </td>
                            <td>
                                <div><input type="number" value={product.stock} name="stock" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>product id</div>
                            </td>
                            <td>
                                <div><input type="text" value={product.productId} name="productId" onChange={(e)=>handleChange(e)}/></div>
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
                            <td>
                                <div><input type="text" value={product.description} name="description" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>category</div>
                            </td>
                            <td>
                                <div><input type="text" value={product.category} name="latitude" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>featured</div>
                            </td>
                            <td>
                                <div><input type="text" value={product.category} name="latitude" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>images</div>
                            </td>
                            <td>
                                <div><input type="file" name="images" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default CreateProduct
