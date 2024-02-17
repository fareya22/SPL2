import axios from 'axios';
import React, { useState } from 'react';
import SingleProduct from './SingleProduct';

const productList = () => {
    const [productCount, setProductCount] = useState(0);
    const [list, setList] = useState([]);

    const handleGetProduct = (e) => {
        e.preventDefault();
        axios.get('http://localhost:3000/products')
            .then(response => {
               
                console.log(response.data);
                setList(response.data);
                setProductCount(response.data.length); 
            })
            .catch(error => {
              
                console.error('Error fetching products:', error);
            });
    }
    return (
        <div>
            <div>{productCount}</div>
            {list.map((product) => (
                    <SingleProduct product={product}/>
            ))}
            <button onClick={handleGetProduct} className="btn btn-success w-100 rounded-0">
                    Get Product
                    </button>
        </div>
    );
};

export default productList;