import React from 'react';
import style from './Products.module.css';
import Spinner from '../UI/Spinner/Spinner';

const Products = (props) => {
    let prodList = [...props.products];
    prodList.sort((a, b) => a.product_title > b.product_title ? 1 : -1);
    return (
        <div className={style.body}>
            <h1 className={style.Heading}>Products</h1>
            {props.loading ? <Spinner /> :
                <div className={style.prodContainer}>
                    {prodList.map(prod =>
                        <div key={prod._id} className={style.Product}> {prod.product_title} : {prod.qty_total}</div>
                    )}
                </div>
            }
        </div>
    );
}

export default Products;