import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function ProductEntry(){

    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:3000/products', { productName, price })
            .then(result => {
               console.log(result);
               navigate('/productList'); 
            })
            .catch(err => {
                console.log(err);
               
            })
    }

    return(
        <div className="d-flex justify-content-center align-item-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h1>Add Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="productName">
                            <strong>Product Name</strong>
                        </label>
                        <input 
                            type="text"
                            placeholder="Enter Product Name"
                            autoComplete="off"
                            name="ProductName"
                            className="form-control rounded-0"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />           
                   </div>
                   <div className="mb-3">
                        <label htmlFor="price">
                            <strong>Price</strong>
                        </label>
                        <input 
                            type="number"
                            placeholder="Enter Price"
                            autoComplete="off"
                            name="price"
                            className="form-control rounded-0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />           
                   </div>
                   <button type="submit" className="btn btn-success w-100 rounded-0">
                    Add Product
                    </button>
                </form>

                <p>Go back to <Link to="/productList">Product List</Link></p>

            </div>
        </div>
    );
}

export default ProductEntry;
