import React from 'react';

const SingleProduct = ({product}) => {
    const {productName, price} = product;
    return (
        <div>
            {productName} <br />
            {price}

        </div>
    );
};

export default SingleProduct;